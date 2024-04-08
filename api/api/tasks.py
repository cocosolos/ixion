from celery import shared_task
from django.core.management import call_command


@shared_task
def verify_urls_task():
    call_command("verify_urls")
