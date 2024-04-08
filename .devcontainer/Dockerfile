FROM nikolaik/python-nodejs:latest

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git \
    && pip install --upgrade pip && npm update -g npm

WORKDIR /workspace

COPY . .
RUN pip install --no-cache-dir -r /workspace/api/requirements.txt
WORKDIR /workspace/client
RUN npm install

CMD ["tail", "-f", "/dev/null"]
