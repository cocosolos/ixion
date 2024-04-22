import os
from celery import Celery
from datetime import timedelta
import api.tasks
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")

app = Celery("api")

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object("django.conf:settings", namespace="CELERY")

# Load task modules from all registered Django apps.
app.autodiscover_tasks()

app.conf.broker_url = f"redis://redis:6379"
app.conf.result_backend = f"redis://redis:6379"

app.conf.beat_schedule = {
    "verify-urls-every-hour": {
        "task": "api.tasks.verify_urls_task",
        "schedule": timedelta(
            minutes=int(os.getenv("SERVER_UPDATE_INTERVAL", default="10"))
        ),
        # "schedule": timedelta(minutes=1),
    },
}

app.conf.timezone = "UTC"
