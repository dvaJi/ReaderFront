# ReaderFront Front End

#### A comic reader meant for users to enjoy reading

- [**API** built with Node, GraphQL, Express, Sequelize (MySQL) and JWT Auth](https://github.com/dvaJi/ReaderFront-API)
- **WebApp** built with React and Redux along ~~(soon) with Server Side Rendering (SSR) / SEO friendly~~

## Installation

- Prerequisites
  - [API](https://github.com/dvaJi/ReaderFront-API)
  - [Node.js 8.11.x](https://nodejs.org/)
- Clone repo `git clone git@github.com:dvaJi/ReaderFront.git ReaderFront`
- Switch to `ReaderFront` directory `cd ReaderFront`
- Configurations
  - Modify `/.env.example` to configurate the app (IMPORTANT) (you should rename it to `/.env`)
- Setup
  - Webapp: Install dependencies `npm install`
- Development
  - Run [API](https://github.com/dvaJi/ReaderFront-API) `go to ReaderFront-API directory` and `npm start`, browse GraphiQL at http://localhost:8000/
  - Run Webapp `npm start`, browse webapp at http://localhost:3000/
- Production
  - Run [API](https://github.com/dvaJi/ReaderFront-API) `go to ReaderFront-API directory` and `npm run start:prod`, creates an optimized build in `build` directory and runs the server
  - Run Webapp `npm build`, creates an optimized build in `build` directory

## Core Structure

      │── public                static files
      │── src
      │   ├── blog              module directory
      │   │   ├── actions       redux actions
      │   │   ├── components    presentational components
      │   │   ├── containers    container component
      │   │   ├── reducers      reducers
      │   │   └── index.js      page
      │   ... others modules ...
      │   ├── App.js
      │   ├── Routes.js
      │   ├── config.js
      │   ├── rootReducer.js
      │   ├── setupTest.js
      │   ├── store
      │   └── index.js
      │── package.json
      ├── .gitignore
      └── README.md

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on our guidelines for [contributing](https://github.com/dvaJi/ReaderFront/blob/master/CONTRIBUTING.md)

## License

MIT
