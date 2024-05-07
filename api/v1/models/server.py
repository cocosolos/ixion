import datetime
import json
import requests
from django.db import models
from django.core.validators import URLValidator
from urllib.parse import urlparse
from v1.common.logging import logger
from django.contrib.gis.geoip2 import GeoIP2
from django.core.exceptions import ValidationError


# Required and recommended settings used to build the initial client server card
required_settings = [
    "MAIN.SERVER_NAME",
    "MAIN.MAX_LEVEL",
    "LOGIN.LOGIN_LIMIT",
]

recommended_settings = [
    "LOGIN.CLIENT_VER",
    "MAIN.ENABLE_TRUST_CASTING",
    "MAIN.HOMEPOINT_TELEPORT",
    "MAIN.ENABLE_SURVIVAL_GUIDE",
    "MAP.LEVEL_SYNC_ENABLE",
    "MAIN.ENABLE_ROE",
    "MAIN.ENABLE_FIELD_MANUALS",
    "MAIN.ENABLE_GROUNDS_TOMES",
]

expansions_settings = {
    "LOGIN.RISE_OF_ZILART": "rotz",
    "LOGIN.CHAINS_OF_PROMATHIA": "cop",
    "LOGIN.TREASURES_OF_AHT_URGHAN": "toau",
    "LOGIN.WINGS_OF_THE_GODDESS": "wotg",
    "LOGIN.SEEKERS_OF_ADOULIN": "soa",
    "MAIN.ENABLE_ACP": "acp",
    "MAIN.ENABLE_AMK": "amk",
    "MAIN.ENABLE_ASA": "asa",
    "MAIN.ENABLE_ABYSSEA": "abyssea",
    "MAIN.ENABLE_VOIDWATCH": "voidwatch",
    "MAIN.ENABLE_ROV": "rov",
    "MAIN.ENABLE_TVR": "tvr",
}


class OptionalSchemeURLValidator(URLValidator):
    def __call__(self, value):
        if "://" not in value:
            # Validate as if it were http://
            value = "http://" + value
        super(OptionalSchemeURLValidator, self).__call__(value)


# TODO: Validation should be probably be moved to `clean` method instead of `save`.
# Currently the serializer handles ValidationError during input, and the only
# other thing calling `save` should be the management tasks which should already
# be validated so should be safe?
# https://docs.djangoproject.com/en/5.0/ref/models/instances/#validating-objects
class Server(models.Model):
    name = models.CharField(max_length=255, null=True, editable=False)
    url = models.CharField(
        primary_key=True,
        max_length=255,
        null=False,
        validators=[OptionalSchemeURLValidator()],
        error_messages={"unique": "A server with this URL already exists."},
    )
    location = models.CharField(max_length=255, null=True, editable=False)
    max_level = models.IntegerField(null=True, editable=False)
    expansions = models.JSONField(null=True, editable=False)
    settings = models.JSONField(null=True, editable=False)
    settings_summary = models.JSONField(null=True, editable=False)
    login_limit = models.IntegerField(null=True, editable=False)
    active_sessions = models.IntegerField(null=True, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(null=True, editable=False)
    up = models.BooleanField(null=True, editable=False)

    @property
    def expires(self):
        try:
            time_since_creation = self.updated - self.created
            return self.updated + min(time_since_creation, datetime.timedelta(hours=24))
        except:
            return datetime.datetime(0, 1, 1, 0, 0, 0)

    def _str_(self):
        return self.url

    def save(self, *args, **kwargs):
        # Prepend a default scheme if the URL does not include one
        if not self.url.startswith(("http://", "https://")):
            self.url = f"http://{self.url}"

        # Extract the domain name from the validated URL
        parsed_url = urlparse(self.url)
        self.url = parsed_url.netloc.lower()

        # Check if formatted server URL is unique
        existing_server = Server.objects.filter(url=self.url).first()
        if existing_server and not self.created:
            raise ValidationError("A server with this URL already exists.")

        # Validate the server API
        if not self.parse_server_api():
            if not self.created:
                raise ValidationError("Server verification failed.")
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

            with open("defaultLsbSettings.json", "r") as default_settings_file:
                default_settings = json.load(default_settings_file)

            expansions = {}
            for setting in expansions_settings:
                expansions[expansions_settings[setting]] = (
                    True if server_settings[setting] else False
                )

            settings_summary = {}
            for setting in recommended_settings:
                if server_settings[setting]:
                    settings_summary[setting] = server_settings[setting]
            # Check customizations
            for key, value in server_settings.items():
                if (
                    key not in required_settings
                    and key not in recommended_settings
                    and key not in expansions_settings
                    and (key not in default_settings or default_settings[key] != value)
                ):
                    settings_summary[key] = value

            self.expansions = expansions
            self.settings = server_settings
            self.settings_summary = settings_summary

            # Request the active session count from API
            response = requests.get(f"http://{self.url}/api/sessions")
            response.raise_for_status()
            active_sessions = response.text
            if active_sessions.isdigit():
                self.active_sessions = int(active_sessions)

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
