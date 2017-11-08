module.exports = {
  setupFiles: [
    '<rootDir>/mock/localstorage',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/test/',
  ],
  coveragePathIgnorePatterns: [
    'localStorage',
  ],
};
