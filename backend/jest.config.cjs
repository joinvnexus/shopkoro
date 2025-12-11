/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/__tests__"],
  moduleFileExtensions: ["ts", "js", "json"],
  setupFiles: ["<rootDir>/jest.setup.ts"],
  testTimeout: 30000,
};

