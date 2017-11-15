module.exports = {
  setupFiles: [
    '<rootDir>/mock/localstorage',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/__mock__/',
  ],
  coveragePathIgnorePatterns: [
    'localStorage',
  ],
};
