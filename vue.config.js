module.exports = {
    css: {
        extract: false
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