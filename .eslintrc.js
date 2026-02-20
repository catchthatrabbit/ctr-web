module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    plugins: [
        "@typescript-eslint",
        "n",
        "react-refresh"
    ],
    "rules": {
        "react-refresh/only-export-components": "error",
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
