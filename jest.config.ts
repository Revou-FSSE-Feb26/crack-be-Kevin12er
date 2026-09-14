import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import ts from 'typescript';

const { config: tsconfig } = ts.readConfigFile('./tsconfig.json', ts.sys.readFile);
const paths = tsconfig?.compilerOptions?.paths ?? {};

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  testEnvironment: 'node',

  // Penting untuk project ESM (module: nodenext)
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: 'tsconfig.spec.json', useESM: true }],
  },

  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  collectCoverageFrom: ['src/**/*.(t|j)s', 'libs/**/*.(t|j)s', 'apps/**/*.(t|j)s'],
  coverageDirectory: './coverage',
};

export default config;