module.exports = function (api) {
    api.cache(true);
  
    const plugins = [
        "@babel/proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        [
            "@babel/plugin-transform-runtime", //1.避免多次编译出helper函数.2解决@babel/polyfill提供的类或者实例方法污染全局作用域的情况
            {
                "corejs": 3,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]      
    ];
  
    const presets = [
        ["@babel/preset-env", {
            "targets": {
                "chrome": 52,
                "browsers": [
                    "last 4 version",
                    "> 1%",
                    "Android >= 2.4",
                    "iOS 7",
                    "IE 8"
                ]
            },
            "corejs": false, //"3" 设置为false，让transform-runtime去做处理
            "modules": false,
            "useBuiltIns": false, //"usage" 设置为false，让transform-runtime去做处理
            "debug": false
        }], 
        "@babel/preset-react"
    ]

    const env = {
        esm: {
            "presets": [
                ["@babel/preset-env", {
                    "targets": {
                        "chrome": 52,
                        "browsers": [
                            "last 4 version",
                            "> 1%",
                            "Android >= 2.4",
                            "iOS 7",
                            "IE 8"
                        ]
                    },
                    "corejs": false, //"3" 设置为false，让transform-runtime去做处理
                    "modules": false,
                    "useBuiltIns": false, //"usage" 设置为false，让transform-runtime去做处理
                    "debug": false
                }]
            ],
        },
        commonjs:{
            "presets": [
                ["@babel/preset-env", {
                    "targets": {
                        "chrome": 52,
                        "browsers": [
                            "last 4 version",
                            "> 1%",
                            "Android >= 2.4",
                            "iOS 7",
                            "IE 8"
                        ]
                    },
                    "corejs": false, //"3" 设置为false，让transform-runtime去做处理
                    "modules": false,
                    "useBuiltIns": false, //"usage" 设置为false，让transform-runtime去做处理
                    "debug": false
                }]
            ],
        }
    }
    return {
      presets,
      plugins,
      env
    };
}