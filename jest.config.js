module.exports = {
    roots: ['<rootDir>', '<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: false,
    collectCoverageFrom: ['./src/**/*.ts'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.json',
        },
    },
    reporters: [
        'default',
        [
            './node_modules/jest-html-reporter',
            {
                pageTitle: 'Automation Test Report',
                outputPath: 'test-report.html',
                includeConsoleLog: true,
                includeFailureMsg: true,
                sort: 'status',
            },
        ],
    ],
    testResultsProcessor: './node_modules/jest-html-reporter',
    moduleNameMapper: {
        '@test(.*)$': '<rootDir>/src/__tests__/$1',
        '@config(.*)$': '<rootDir>/src/config/$1',
        '@entities(.*)$': '<rootDir>/src/entities/$1',
        '@report(.*)$': '<rootDir>/src/report/$1',
        '@utils(.*)$': '<rootDir>/src/utils/$1',
        '@web-wrapper(.*)$': '<rootDir>/src/web-wrapper/$1',
    },
};
