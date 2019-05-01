# Pizza Party

## setup

### for development

#### Domains

Make sure these are mapped against your docker host.

```
  api.local.test
  local.test
```

#### Quickstart

The [script](https://github.com/github/scripts-to-rule-them-all) folder contains a quick start script, that will run `docker-compose up` with the defaul development environment config.

```
script/start
```

#### Services

| Service  |    Ports | Domain           | Purpose                    |
| -------- | -------: | :--------------- | :------------------------- |
| NGINX    | `80/443` | `all`            | Map domains to services    |
| API      |  `7002*` | `api.local.test` | Rest API                   |
| Platform |  `3000*` | `local.test`     | front-end nextjs react app |
| DB       |  `54320` | `-`              | Postgres database          |

> `*` Not exposed outside Docker network
