# Ixion

## Description

Ixion is designed to catalog public [LandSandBoat](https://github.com/LandSandBoat/server) servers. The API accepts POST requests with the `url` parameter which are fetched with the `/api/settings` subdirectory, looking for some required LSB settings as a json response. Valid LSB URLs are saved and periodically checked and updated accordingly. When a previously valid URL has been inactive for 24 hours, it is removed from the database.

The React client fetches server data from the API and displays it in a relevant way to users. Filtering is built into the client for now. When the API response fails or is empty, a default LSB demo server is displayed, pulling some info from GitHub.

[This product includes GeoLite2 Data created by MaxMind.](https://www.maxmind.com/)

## Features

- **Automatic Verification**: Verifies LSB server URL by sending a request to the public API. [Requires the LSB server to enable the HTTP server.](https://github.com/LandSandBoat/server/blob/df311283c4abb779d212e2b8af6734b0d8d11ad7/settings/default/network.lua#L33)
- **Automatic Deletion**: Deletes LSB servers from the database if their API is found to be invalid after a configurable period of inactivity ([default 24hrs](./api/.env.example#L8)).
- **Periodic Checks**: Runs update checks on all LSB servers in the database.
- **Server Filtering**: Filter LSB servers by different parameters.
- **Dockerized Deployment**: The application is containerized for easy deployment and development.

## Setup Instructions

### Production

#### API

In the `api` directory copy `.env.example` to `.env` and set details accordingly.

```sh
docker compose up
```

The API will be running on port 8000.

#### Client

In the `client` directory:

```sh
npm install
npm run build
npm start
```

Build output is in `dist/`. Client will be running on port 3000.

---

### Development

Download the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension for VS Code and open the folder in the container. This also works well in codespaces.

If using Windows, highly recommend using WSL and storing the repo in the WSL filesystem.

## License

MIT
