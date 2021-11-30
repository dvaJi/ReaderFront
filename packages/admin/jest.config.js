module.exports = {
  setupFilesAfterEnv: ['./src/setupTests.js'],
  "transform": {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  "moduleNameMapper": {
    "^utils(.*)$": "<rootDir>/src/utils$1",
    "^lib(.*)$": "<rootDir>/src/lib$1",
    "^@hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@pages(.*)$": "<rootDir>/src/pages$1",
    "^@components(.*)$": "<rootDir>/src/components$1"
  },
  "transformIgnorePatterns": [
    "/node_modules/(?!@readerfront/ui).+\\.js$",
    "/node_modules/(?!@readerfront/shared).+\\.js$"
  ],
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.{js,jsx}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/src/index.js",
    "!<rootDir>/src/Routes.js",
    "!<rootDir>/src/registerServiceWorker.js",
    "!<rootDir>/src/common/WithTracker.js",
    "!<rootDir>/src/(state|themes|config|setupApollo|setupProxy|setupIcons|Root|App).js",
    "!<rootDir>/src/auth/(AuthCheck|RoutePrivate).js",
    "!<rootDir>/src/utils/mocks/*.{js}",
    "!<rootDir>/src/utils/(helpers|common).js"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 60,
      "functions": 60,
      "lines": 60,
      "statements": 60
    }
  },
  "coverageReporters": [
    "json",
    "lcov",
    "text"
  ]
}