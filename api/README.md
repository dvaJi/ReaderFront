# ReaderFront API

## Installation

- Prerequisites
  - Node
  - MySQL
- Configurations
  - Modify `/.env.example` to configurate the app (IMPORTANT) (you should rename it to `/.env`)
- Setup
  - API: Install packages and database setup (migrations and seed) `npm run setup`
- Development
  - Run `npm start`, browse GraphiQL at http://localhost:8000/
- Production
  - Run `npm run start:prod`, creates an optimized build in `build` directory and runs the server

## Core Structure

      │── public            static files endpoint
      │── src
      │   ├── config        params, server and database configurations
      │   ├── migrations    sequelize migrations
      │   ├── modules       modules containing queries, mutations, models, etc.
      │   ├── seeders       sequelize seeders
      │   └── setup         setup configurations, modules and start server
      │── index.js
      │── package.json
      ├── .gitignore
      └── README.md

## License

MIT
