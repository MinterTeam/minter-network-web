module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "useBuiltIns": "usage",
                "corejs": 3,
            }
        ]
    ],
    "compact": true,
    "plugins": ["@babel/plugin-proposal-object-rest-spread"]
};
