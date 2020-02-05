module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      'ci',
      'docs',
      'feat',
      'fix',
      'perf',
      'refactor',
      'style',
      'test',
      'translation',
      'chore'
    ]
  }
};
