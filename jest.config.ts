import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { sourceMaps: 'inline' }],
  },
  moduleNameMapper: {
    '^hiddenlayer-sdk$': '<rootDir>/src/index.ts',
    '^hiddenlayer-sdk/(.*)$': '<rootDir>/src/$1',
    '^@aws-sdk/client-s3$': '<rootDir>/tests/__mocks__/@aws-sdk/client-s3.ts',
    '^@azure/storage-blob$': '<rootDir>/tests/__mocks__/@azure/storage-blob.ts',
    '^@huggingface/hub$': '<rootDir>/tests/__mocks__/@huggingface/hub.ts',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/ecosystem-tests/',
    '<rootDir>/dist/',
    '<rootDir>/deno/',
    '<rootDir>/deno_tests/',
    '<rootDir>/packages/',
  ],
  testPathIgnorePatterns: ['scripts'],
};

export default config;
