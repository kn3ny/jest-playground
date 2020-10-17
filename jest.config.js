module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // @see https://kulshekhar.github.io/ts-jest/user/config/#paths-mapping
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};
