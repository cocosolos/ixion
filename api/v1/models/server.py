import os
import requests
from django.db import models
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from urllib.parse import urlparse
from v1.common.logging import logger


required_settings = [
    "MAIN.SERVER_NAME",
    "MAIN.MAX_LEVEL",
    "LOGIN.LOGIN_LIMIT",
]


class OptionalSchemeURLValidator(URLValidator):
    def __call__(self, value):
        if "://" not in value:
            # Validate as if it were http://
            value = "http://" + value
        super(OptionalSchemeURLValidator, self).__call__(value)


class Server(models.Model):
    url = models.CharField(
        max_length=400,
        null=False,
        validators=[OptionalSchemeURLValidator()],
    )
    settings = models.JSONField(null=True, editable=False)
    active_sessions = models.IntegerField(null=True, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    inactivity_counter = models.IntegerField(null=True, editable=False)

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
            if (
                self.inactivity_counter is None
                or self.inactivity_counter
                >= int(os.getenv("SERVER_INACTIVITY_TIMEOUT", default="24")) - 1
            ):
                return False
            self.inactivity_counter += 1
        else:
            if self.settings["API.DO_NOT_TRACK"]:
                return False
            self.inactivity_counter = 0

        # Proceed with saving the object
        logger.info(f"Saving Server object with URL: {self.url}")
        super(Server, self).save(*args, **kwargs)
        return True

    def parse_server_api(self):
        try:
            # Request server settings from API
            response = requests.get(f"http://{self.url}/api/settings")
            response.raise_for_status()  # Raise an exception for HTTP errors (4xx and 5xx)
            json_data = response.json()

            # Validate the JSON structure
            if not isinstance(json_data, dict):
                return False

            for setting in required_settings:
                if setting not in json_data:
                    return False

            self.settings = json_data

            # Request the active session count from API
            response = requests.get(f"http://{self.url}/api/sessions")
            response.raise_for_status()  # Raise an exception for HTTP errors (4xx and 5xx)
            session_count = response.text
            if session_count.isdigit():
                self.active_sessions = int(session_count)
            return True

        except requests.RequestException:
            return False
