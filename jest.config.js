const path = require('path');
const { lstatSync, readdirSync } = require('fs');

// get listing of packages in mono repo
const basePath = path.resolve(__dirname, 'packages');
const packages = readdirSync(basePath).filter(name =>
  lstatSync(path.join(basePath, name)).isDirectory()
);

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
    // automatically generated list of our packages from packages directory.
    // will tell jest where to find source code for @readerfront/ packages, it points to the src instead of dist.
    ...packages.reduce(
      (acc, name) => ({
        ...acc,
        [`@readerfront/${name}(.*)$`]: `<rootDir>/packages/./${name}/src/$1`
      }),
      {}
    )
  },
  modulePathIgnorePatterns: [
    ...packages.reduce(
      (acc, name) => [...acc, `<rootDir>/packages/${name}/build`],
      []
    )
  ]
};
