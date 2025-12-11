export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: true,
      },
    ],
  },

  moduleNameMapper: {
    '^(.*)\\.js$': '$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
  },
};
