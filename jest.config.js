/**
 * @type {import('jest').Config}
 */
module.exports = {
  clearMocks: true,

  collectCoverage: false,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  // ts-jest与swc-jest二选一
  // preset: 'ts-jest',
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },

  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },

  // testMatch: ["<rootDir>/src/**/*/*.spec.ts"],
  testMatch: [
    // "<rootDir>/src/views/login/*.spec.ts",
    // "<rootDir>/src/views/home/*.spec.ts",
    // "<rootDir>/src/views/template/*.spec.ts",
    // "<rootDir>/src/views/user/*.spec.ts",
    "<rootDir>/src/views/permission/*.spec.ts",
    // "<rootDir>/src/views/role/*.spec.ts",
  ],
};
