module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node":true,
    },
    "extends": [
        "eslint:recommended",
  //      "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars-experimental": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any":"off",
        '@typescript-eslint/no-var-requires': 'off',
       "semi": ["error", "always"],
        '@typescript-eslint/ban-ts-comment': [
            'error',
            {'ts-ignore': 'allow-with-description'},
        ],
     /* //  "indent": [true, "spaces"],
      //  "quotemark": [true, "single"],
      //  "object-literal-sort-keys": false,
      //  "trailing-comma": false,
      //  "class-name": true,
       // "semicolon": [true, "always"],
        "triple-equals": [true, "allow-null-check"],
        "eofline": true,
        "jsdoc-format": true,
        "member-access": false,
        "whitespace": [true,
            "check-decl",
            "check-operator",
            "check-separator",
            "check-type"
        ],
        "no-require-imports": true,
        "no-reference": true,
        "ordered-imports": false,
        "no-trailing-whitespace": false*/
    }
};
