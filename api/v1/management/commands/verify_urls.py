# api/v1/management/commands/verify_urls.py

from django.core.management.base import BaseCommand
from v1.common.logging import logger
from v1.models.server import Server
from concurrent.futures import ThreadPoolExecutor


class Command(BaseCommand):
    help = "Verify URLs and delete invalid Server objects"

    def handle(self, *args, **kwargs):
        logger.info("Verifying URLs...")
        self.verify_urls()

    def verify_urls(self):
        # Define a function to process each server
        def process_server(server):
            if not server.save():
                logger.info(f"Deleting Server object with URL: {server.url}")
                server.delete()

        # Use ThreadPoolExecutor to parallelize the task
        with ThreadPoolExecutor() as executor:
            executor.map(process_server, Server.objects.all())
