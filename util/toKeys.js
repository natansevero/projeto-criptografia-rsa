const ursa = require('ursa')

function keys() {
    return ursa.generatePrivateKey();
}

function privatePem(keys) {
    return keys.toPrivatePem('base64');
}

function publicPem(keys) {
    return keys.toPublicPem('base64');
}

module.exports = {
    keys,
    privatePem,
    publicPem
}