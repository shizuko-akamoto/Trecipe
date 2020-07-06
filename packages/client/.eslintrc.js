module.exports = {
  extends: [
    "react-app",
    "plugin:prettier/recommended",
  ],
  plugins: [],
  env: { node: true, es6: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {},
  settings:  {
    react:  {
      version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};