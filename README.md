# CORS

A simple demo of a few scenarios that use [Cross Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

> This is a part of [my talk on CORS](https://talks.harshkapadia.me/cors).

## Usage

### Client Setup

-   Serve `client/index.html` on port 3000 (`http://localhost:3000`).
    -   The [`serve` package](https://www.npmjs.com/package/serve) can be used.

### Server Setup

-   In `server` run `npm install` to install all dependencies.
-   Run the server on port 5000 (`http://localhost:5000`) by running `npm run start` in the `server` directory.

### Proxy Server Setup

-   In `proxy-server` run `npm install` to install all dependencies.
-   Run the server on port 8000 (`http://localhost:8000`) by running `npm run start` in the `proxy-server` directory.

## Resources

-   My talk on CORS: [talks.harshkapadia.me/cors](https://talks.harshkapadia.me/cors)
-   My resources: [dev.harshkapadia.me/resources#cors](https://dev.harshkapadia.me/resources#cors)
