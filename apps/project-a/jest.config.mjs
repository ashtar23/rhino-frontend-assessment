export default {
  displayName: "project-a",
  rootDir: ".",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "<rootDir>/tsconfig.jest.json",
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@repo/auth$": "<rootDir>/../../packages/auth/src/index.ts",
    "^@repo/constants$": "<rootDir>/../../packages/constants/src/index.ts",
    "^@repo/data$": "<rootDir>/../../packages/data/src/index.ts",
    "^@repo/types$": "<rootDir>/../../packages/types/src/index.ts",
    "^@repo/ui$": "<rootDir>/../../packages/ui/src/index.ts",
  },
  modulePathIgnorePatterns: ["<rootDir>/.next/"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/.next/"],
  watchPathIgnorePatterns: ["<rootDir>/.next/"],
};
