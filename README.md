# Researchive

**A simple research archive app to demonstrate Docker**

## Getting Started

Use `docker compose` to get a development environment setup with auto reload! Run:

```
$ docker compose build
$ docker compose up
```

You should now be able to access the web ui at [localhost:3000](http://localhost:3000) and the API server at [localhost:8000](http://localhost:8000/docs). When you make changes to the the source code in the `web` and `api` folders, the development reloaders implemented by uvicorn and yarn should automatically reload the app.

