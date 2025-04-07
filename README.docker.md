# Docker Setup for Swaply

This document provides instructions for running the Swaply application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuration

The application uses environment variables for configuration. These are defined in the `.env` file and passed to the containers through Docker Compose.

Key environment variables:
- `VITE_COINGECKO_API_KEY`: API key for CoinGecko integration

## Available Services

The Docker Compose configuration includes two services:

1. **app**: Production build of the application served by Nginx
2. **dev**: Development environment with hot-reloading

## Running the Application

### Production Mode

To build and run the application in production mode:

```bash
docker-compose up app
```

The application will be available at http://localhost:80

### Development Mode

To run the application in development mode with hot-reloading:

```bash
docker-compose up dev
```

The application will be available at http://localhost:5173

## Building the Docker Image

If you want to build the Docker image without starting the containers:

```bash
docker-compose build
```

## Stopping the Application

To stop the running containers:

```bash
docker-compose down
```

## Volumes

The Docker Compose configuration uses a named volume for `node_modules` to improve performance and prevent conflicts with the host machine's node_modules directory.

## Customization

- **Port Mapping**: If you need to change the port mapping, edit the `ports` section in the `docker-compose.yml` file.
- **Environment Variables**: Add or modify environment variables in the `.env` file and update the `environment` section in the `docker-compose.yml` file as needed.