module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "useBuiltIns": "usage"
            }
        ]
    ],
    "compact": true,
    "plugins": ["@babel/plugin-proposal-object-rest-spread"]
};
