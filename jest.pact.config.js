module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/contract/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/contract/jest.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    },
  },
};

