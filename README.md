# ReaderFront

#### A comic reader meant for users to enjoy reading

## Codebase

### Technologies

- **MariaDB**: Data storage
- **GraphQL**: API
- **React**: Frontend React app

### Folder structure

```sh
readerfront/
├── packages/
  ├── admin      # Administration control panel
  ├── api        # API server
  ├── shared     # Shared JavaScript code
  ├── ui         # Shared React components
  ├── web        # Frontend NextJS
```

### Requirements:
  - Node JS 14
  - yarn

### Production Installation steps:

Please follow [PRODUCTION](https://github.com/dvaJi/ReaderFront/blob/master/PRODUCTION.md) instructions.

### Development Installation steps:

1. **Install MariaDB**: See [the MariaDB documentation](https://downloads.mariadb.org/) for instructions on installing it with your OS.
2. **Install the dependencies**:

```sh
yarn install
```

### Migrating the database

When you first download the code and want to run it locally you have to migrate the database and seed it with test data. First, start mariadb, then, run these commands:

```sh
yarn db:migrate
```

If you want to imoplement the sample data (includes admin users):

```sh
yarn setup:db
```

## Running the app locally

Depending on what you're trying to work on you'll need to start different servers. Generally, all servers run in development mode by doing `yarn start:<projectname>`, e.g. `yarn start:api` to start the API, but first you have to check the secrets, every project contains a `.env.example` file with the necessary values.

### Develop the API

To develop the API run:

```
yarn start:api
```

### Develop the web UI

To develop the web UI run:

```
yarn start:web
```

### Develop the admin UI

To develop the admin UI run:

```
yarn start:admin
```

### Run All Apps

This is only recommended in dev environment. DO NOT USE THIS IN PRODUCTION!

```
yarn start:all
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on our guidelines for [contributing](https://github.com/dvaJi/ReaderFront/blob/master/CONTRIBUTING.md)

## License

[MIT](https://github.com/dvaJi/ReaderFront/blob/master/LICENSE)
