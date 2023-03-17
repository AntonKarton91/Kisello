const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@components': resolvePath('./src/Components'),
            '@': resolvePath('./src/'),
            '@styles': resolvePath('./src/styles')
        }
    },
}