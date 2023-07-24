module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    "/node_modules/(?!(react-native|@react-native|@react-navigation|react-native-reanimated|react-native-shadow-2|react-native-toast-message)/)",
  ]
};