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
├── admin      # Administration control panel
├── api        # API server
├── public     # Public files used on the frontend
├── shared     # Shared JavaScript code
├── src        # Frontend NextJS
```

### Production Installation steps:

Please follow [PRODUCTION](https://github.com/dvaJi/ReaderFront/blob/master/PRODUCTION.md) instructions.

### Development Installation steps:

1. **Install MariaDB**: See [the MariaDB documentation](https://downloads.mariadb.org/) for instructions on installing it with your OS.
2. **Install the dependencies**: Because it's pretty tedious to install the dependencies for each project individually we've created a script that goes through and runs `npm install` for project for you:

```sh
node shared/install-dependencies.js
```

### Migrating the database

When you first download the code and want to run it locally you have to migrate the database and seed it with test data. First, start mariadb, then, run these commands:

```sh
npm run db:migrate
```

If you want to include the sample data (it include admin users):

```sh
npm run setup:db
```

## Running the app locally

Depending on what you're trying to work on you'll need to start different servers. Generally, all servers run in development mode by doing `npm run dev:<projectname>`, e.g. `npm run dev:api` to start the API, but first you have to check the secrets, every project contains a `.env.example` file with the necessary values.

### Develop the API

To develop the API run:

```
npm run dev:api
```

### Develop the web UI

To develop the web UI run:

```
npm run dev
```

### Develop the admin UI

To develop the admin UI run:

```
npm run dev:admin
```

### Run All Apps

This is only recommended in dev environment. DO NOT USE THIS IN PRODUCTION!

```
npm run dev:all
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on our guidelines for [contributing](https://github.com/dvaJi/ReaderFront/blob/master/CONTRIBUTING.md)

## License

[MIT](https://github.com/dvaJi/ReaderFront/blob/master/LICENSE)
