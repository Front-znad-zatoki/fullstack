export default {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  testRegex: '(spec|test)[.]js',
  testPathIgnorePatterns: ['/node_modules/', '/client', '/config'],
  coverageDirectory: '../coverage',
  setupFiles: ['./test/setupJest.js'],
  collectCoverageFrom: ['./features/**'],
};
