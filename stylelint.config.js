module.exports = {
    extends: [
        "stylelint-config-standard-scss",
    ],
    plugins: [
        "stylelint-order"
    ],
    rules: {
        "order/properties-alphabetical-order": true,

        "scss/dollar-variable-pattern": "^[_a-z]+[a-zA-Z0-9-]*$",
        "scss/at-mixin-pattern": "^[_a-z]+[a-zA-Z0-9-]*$",

        // Angular-friendly
        "selector-class-pattern": null
    }
};
