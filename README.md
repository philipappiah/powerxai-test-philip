

---

# METRICS SERVICE

A Node.js server to generate and ingest new data and return metrics based on specified start and end dates using [Express ](http://expressjs.com/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```bash
npm install
npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

You can view the api docs via the endpoint http://localhost:3000/api-docs



## Running with Docker
Make sure you have [Docker](https://www.docker.com/) and [Docker-Compose](https://docs.docker.com/compose/) installed.
Docker version 20.10.10 or higher

```bash
docker compose up
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

You can view the api docs via the endpoint http://localhost:3000/api-docs

## Testing
```bash
npm run test
```
