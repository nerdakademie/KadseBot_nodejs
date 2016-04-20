# KadseBot


## Breaking changes

_KadseBot_ is used for a number of different services now. Still it is a work in progress. See [CHANGELOG.md](./CHANGELOG.md) for instructions on breaking changes.

## Features included

* Telegram Bot
* NAK Api Features

## Setup

Install dependencies:

    $ npm install

### Optional

To make IntelliJ development features work properly. (You still have to configure them!)

    $ npm install -g eslint eslint-plugin-react gulp

## Build

Build client:

    $ npm run build

## Startup

Start the dev-server:

    $ GROUP=example npm run start-dev

Or start the live-server:

    $ NODE_ENV=production GROUP=example npm run start

For debug information add following environment parameter before the npm run command:

    $ DEBUG=turing-microservice:*

Then open a browser and visit:

* Demo Index Page - http://localhost:8080/turing-microservice/
* Status Page - http://localhost:8080/turing-microservice/internal/status    
* Health Check - http://localhost:8080/turing-microservice/internal/health
    
## Testing
  
    $ npm test

This also:

* runs eslint
* creates coverage reports

## Initial Contributors

Benedikt Stemmildt

## License

MIT
