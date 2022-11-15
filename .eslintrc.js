module.exports = {
  
    "extends": [
      "standard",
      "plugin:react/recommended",
      "eslint:recommended"
    ],
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jquery": true
    },
    "plugins": [
        "standard",
        "promise",
        "react",
        "react-hooks"
    ],
    "rules": {
        "semi": "warn",
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
        // "ignoreEOLComments": true,
        "no-multi-spaces": "warn",
        "comma-dangle": "warn",
        "no-trailing-spaces": "warn",
        "quotes": "warn",
        "indent": "warn",
        // "exceptions": { "Property": true } 
    }
};
