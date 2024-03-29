# RunLog

Stripped down application to prove I can code. Rails API and React frontend with a postgres database behind. All wrapped up in docker.

### Prerequisites

Git

Docker

Docker-Compose

### Installing

Clone this repo.

```
git clone https://github.com/Donald47/runlog.git
```

Build the images.

```
docker-compose build
```

### Node Packages.

Due to how docker compose volume linking works and the requirements for Cypress integration testing there are two options.

To install the packages via the docker image.
```
docker-compose run frontend npm install --only=production
```
This allows running the app without installing npm locally.

Install locally.
```
cd frontend && npm install && cd ..
```
This allows running the cypress tests against the frontend.
Note only certain operating systems support cypress and it may require some additional installs.

Create migrate and populate the database

```
docker-compose run api rake db:create db:migrate db:seed
```

Spin everything up

```
docker-compose up
```

### API

```
localhost:3000
```

### Frontend

```
localhost:4000
```

### Test user details

```
hello@test.com
password
```

### Cleaning up

```
docker-compose down
```

## Running the tests

### API

```
docker-compose run api bin/rails test
```

### Frontend

```
docker-compose run rake db:seed
docker-compose up
```

While the development environment is running.
In a new terminal environment start the cypress test suite assuming you installed it.

```
frontend/node_modules/.bin/cypress open
```
