const esModules = ['@readerfront/ui', '@readerfront/shared'].join('|');

module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^utils(.*)$': '<rootDir>/src//utils$1',
    '^lib(.*)$': '<rootDir>/src//lib$1',
    '^@hooks(.*)$': '<rootDir>/src//hooks$1',
    '^@pages(.*)$': '<rootDir>/src//pages$1',
    '^@components(.*)$': '<rootDir>/src//components$1'
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/__tests__/mocks/'
  ],
  transformIgnorePatterns: [`/node_modules/(?!${esModules}).+\\.js$`],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**src/__mocks__/**',
    '!**src/__tests__/**',
    '!**coverage/**',
    '!(server|jest.config|next.config|commitlint.config|.versionrc|.prettierrc|.eslintrc).js',
    '!**src/pages/(_app|_document).js'
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  }
};
