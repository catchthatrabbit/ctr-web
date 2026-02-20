module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended",
        "plugin:promise/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    plugins: [
        "@typescript-eslint",
        "promise",
        "n",
        "react-refresh"
    ],
    settings: {
        react: {
          version: "detect",
        },
      },
    "rules": {
        "react-refresh/only-export-components": "error",
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
        "react/prop-types": "off",
        "no-console": "warn",
        "sort-imports": "off",
        "indent": ["error", 2],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-var": "error",
        "prefer-const": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"]
    }
}
