import datetime
import json
import os
import socket
import requests
from django.db import models
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from urllib.parse import urlparse
from v1.common.logging import logger
from django.contrib.gis.geoip2 import GeoIP2

# Required and recommended settings used to build the initial client server card
required_settings = [
    "MAIN.SERVER_NAME",
    "MAIN.MAX_LEVEL",
    "LOGIN.LOGIN_LIMIT",
]

recommended_settings = [
    "MAIN.ENABLE_TRUST_CASTING",
    "MAP.LEVEL_SYNC_ENABLE",
    "LOGIN.RISE_OF_ZILART",
    "LOGIN.CHAINS_OF_PROMATHIA",
    "LOGIN.TREASURES_OF_AHT_URGHAN",
    "LOGIN.WINGS_OF_THE_GODDESS",
    "LOGIN.SEEKERS_OF_ADOULIN",
]


class OptionalSchemeURLValidator(URLValidator):
    def __call__(self, value):
        if "://" not in value:
            # Validate as if it were http://
            value = "http://" + value
        super(OptionalSchemeURLValidator, self).__call__(value)


class Server(models.Model):
    name = models.CharField(max_length=255, null=True, editable=False)
    url = models.CharField(
        max_length=255,
        null=False,
        validators=[OptionalSchemeURLValidator()],
    )
    location = models.CharField(max_length=255, null=True, editable=False)
    max_level = models.IntegerField(null=True, editable=False)
    settings = models.JSONField(null=True, editable=False)
    customizations = models.JSONField(null=True, editable=False)
    login_limit = models.IntegerField(null=True, editable=False)
    active_sessions = models.IntegerField(null=True, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(null=True, editable=False)
    up = models.BooleanField(null=True, editable=False)

    @property
    def expires(self):
        time_since_creation = self.updated - self.created
        return self.updated + min(time_since_creation, datetime.timedelta(hours=24))

    def _str_(self):
        return self.url

    def save(self, *args, **kwargs):
        # Prepend a default scheme if the URL does not include one
        if not self.url.startswith(("http://", "https://")):
            self.url = f"http://{self.url}"

        # Extract the domain name from the validated URL
        parsed_url = urlparse(self.url)
        self.url = parsed_url.netloc.lower()

        # Check if server URL is unique
        existing_server = Server.objects.filter(url=self.url).first()
        if existing_server and existing_server.pk != self.pk:
            raise ValidationError("A server with this URL already exists.")

        # Validate the server API
        if not self.parse_server_api():
            if self.expires <= datetime.datetime.now(datetime.timezone.utc):
                return False
            self.up = False
        else:
            if self.settings["API.DO_NOT_TRACK"]:
                return False
            self.up = True
            self.updated = datetime.datetime.now(datetime.timezone.utc)

        # Proceed with saving the object
        logger.info(f"Saving Server object with URL: {self.url}")
        super(Server, self).save(*args, **kwargs)
        return True

    def parse_server_api(self):
        try:
            # Request server settings from API
            response = requests.get(f"http://{self.url}/api/settings", timeout=5)
            response.raise_for_status()
            server_settings = response.json()
            if not isinstance(server_settings, dict):
                return False

            # Check for required settings
            for setting in required_settings:
                if setting not in server_settings:
                    return False
            self.name = server_settings["MAIN.SERVER_NAME"]
            self.max_level = server_settings["MAIN.MAX_LEVEL"]
            self.login_limit = server_settings["LOGIN.LOGIN_LIMIT"]

            # Check customizations
            with open("defaultLsbSettings.json", "r") as default_settings_file:
                default_settings = json.load(default_settings_file)
            customizations = {}

            customizations["LOGIN.CLIENT_VER"] = server_settings["LOGIN.CLIENT_VER"]

            for key, value in server_settings.items():
                if key not in required_settings and (
                    key in recommended_settings
                    or key not in default_settings
                    or default_settings[key] != value
                ):
                    customizations[key] = value

            self.customizations = customizations
            self.settings = server_settings

            # Request the active session count from API
            response = requests.get(f"http://{self.url}/api/sessions")
            response.raise_for_status()
            session_count = response.text
            if session_count.isdigit():
                self.active_sessions = int(session_count)

            # Test other server ports (you can actually change all of these?)
            # ports_to_check = [
            #     54230, # NETWORK.LOGIN_DATA_PORT, NETWORK.MAP_PORT
            #     54231, # NETWORK.LOGIN_AUTH_PORT
            #     54001, # NETWORK.LOGIN_VIEW_PORT
            # ]
            # for port in ports_to_check:
            #     try:
            #         with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            #             s.settimeout(5)
            #             s.connect((self.url, port))
            #     except socket.error:
            #         return False

            try:
                g = GeoIP2()
                city = g.city(f"{self.url}")
                self.location = city["continent_code"]
            except:
                self.location = "??"

            return True

        except requests.RequestException:
            return False
