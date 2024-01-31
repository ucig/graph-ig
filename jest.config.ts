export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js|jsx|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(ky)/)',
  ],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  reporters: ["default", "jest-junit"],
  coverageReporters: ["json", "lcov", "text", "clover"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
  ],
};
