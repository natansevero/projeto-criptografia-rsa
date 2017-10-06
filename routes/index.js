const ursa = require('ursa');
const toKeys = require('../util/toKeys');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index')
    })

    app.get('/gerarChaves', (req, res) => {
        var keys = toKeys.keys();

        var publicPem = toKeys.publicPem(keys);
        // var pub = ursa.createPublicKey(publicPem, 'base64');

        var privatePem = toKeys.privatePem(keys);
        // var priv = ursa.createPrivateKey(privatePem, '', 'base64');

        res.json({
            publicPem,
            privatePem
        })
    })

    /*
        Mandar texto e chave publica
    */
    app.post('/cripto', (req, res) => {
        let msg = req.body.msg
        let publicaPem = req.body.publicaPem

        // console.log(msg, publicaPem)

        let pub = ursa.createPublicKey(publicaPem, 'base64');

        let msgBuffer = new Buffer(msg);
        // Msg Criptogafada 
        let msgCripto = pub.encrypt(msg);
        // console.log('msgCrip', msgCripto)
        res.json({
            msgCripto: msgCripto.toString(),
            msgBuffer: msgCripto
        })
    })

    /*
        Mandar texto criptografado e chave privada
    */
    app.post('/descripto', (req, res) => {
        let msgCripto = req.body.msgCripto
        let privadaPem = req.body.privadaPem

        // console.log(msg, publicaPem)

        let priv = ursa.createPrivateKey(privadaPem, '', 'base64');

        // Msg Descriptogafada 
        let msgDescripto = priv.decrypt(msgCripto);

        res.json({
            msgDescripto: msgDescripto.toString()
        })
    })
}