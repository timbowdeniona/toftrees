import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^#theme(.*)$': '<rootDir>/theme$1',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^data/(.*)$': '<rootDir>/data/$1',
    '^sanity/(.*)$': '<rootDir>/sanity/$1',
    'nanoid': '<rootDir>/__mocks__/nanoid.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(nanoid|@sanity/client|next-sanity|@sanity/image-url))/',
  ],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)