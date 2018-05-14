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

Spin them up.

```
docker-compose up
```

Create migrate and populate the database (Use a new terminal)

```
docker-compose run api rake db:create db:migrate db:seed
```

API avalable on localhost:3000 views on localhost:4000
Test user details:

```
hello@test.com
password
```

### Cleaning up

```
docker-compose down
```

## Running the tests

TODO.
