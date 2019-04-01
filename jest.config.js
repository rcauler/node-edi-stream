module.exports = {
  collectCoverageFrom: [
  	"src/**/*.ts"
	],
  coveragePathIgnorePatterns: [
    "/lib/",
    "/node_modules/",
	],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json'
		}
	},
	moduleFileExtensions: [
		'ts',
		'js'
	],
  transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	testMatch: [
		'**/*.spec.(ts|js)'
	],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/lib/"
	],
  testEnvironment: 'node'
};
