$(document).ready(function() {
    var msgBufferCripto;

    $('#gerarChaves').click(function(e) {
        e.preventDefault();

        $.get('http://localhost:3000/gerarChaves', function(data){
            $('#chave_publica').val(data.publicPem)           
            $('#chave_privada').val(data.privatePem)

            $('#passando_chave_publica').val(data.publicPem)
            $('#passando_chave_privada').val(data.privatePem)
        }) 
    })

    $('#btnCripto').click(function(e) {
        e.preventDefault();

        var msg = $('#msg').val();
        var publicaPem = $('#passando_chave_publica').val();

        $.post('http://localhost:3000/cripto', {msg: msg, publicaPem: publicaPem}, function(data) {
            // console.log(data.msgCripto)

            msgBufferCripto = data.msgBuffer;
            $('#mensagem_cripto').val(data.msgCripto)
        })
    })

    $('#btnDescripto').click(function(e) {
        e.preventDefault();

        var msgCripto = $('#mensagem_cripto').val();
        var privadaPem = $('#passando_chave_privada').val();
        
        $.post('http://localhost:3000/descripto', {msgCripto: msgBufferCripto, privadaPem: privadaPem}, function(data) {
            // console.log(data.msgCripto)

            $('#mensagem_descripto').val(data.msgDescripto)
        })
    })
})