
module.exports = {
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
	},
	moduleFileExtensions: ['js', 'jsx'],
	testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
};
