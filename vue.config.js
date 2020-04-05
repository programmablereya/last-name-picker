module.exports = {
    filenameHashing: false,
    css: {
        extract: false
    },
    pages: {
        contentscript: {
            entry: "src/contentscript.js",
            template: "public/contentscript-example.html",
            filename: "contentscript-example.html"
        },
        main: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "Last Name Picker"
        }
    },
    configureWebpack: {
        output: {
            libraryExport: 'default'
        },
        resolve: {
            alias: {
                'handlebars': 'handlebars/dist/handlebars.js'
            }
        }
    },
};