module.exports = {
    "extends": [
      "standard",
      "plugin:react/recommended"
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
    ],
    "rules": {
        "semi": [2, "always"],
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": "off"

      
    }
};
