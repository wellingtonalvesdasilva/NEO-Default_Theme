export function enviarFaleConosco() {
    var formulario = {
        "nome": $("input[name=nome]").val(),
        "email": $("input[name=email]").val(),
        "telefone": $("input[name=celular]").val(),
        "assunto": $("input[name=assunto]").val(),
        "mensagem": $("textarea[name=mensagem]").val(),
    };
    sessionStorage.setItem('contato', JSON.stringify(formulario));
}

export function carregarUltimoContato() {
    var contato = JSON.parse(sessionStorage.getItem("contato"));
    if (contato) {
        $("input[name=nome]").val(contato.nome).trigger("keyup");
        $("input[name=email]").val(contato.email).trigger("keyup");
        $("input[name=celular]").val(contato.telefone).trigger("keyup");
        $("input[name=assunto]").val(contato.assunto).trigger("keyup");
        $("textarea[name=mensagem]").val(contato.mensagem).trigger("keyup");
    }
}

$(document).ready(function () {
    $('#formContato')
        .form({
            on: 'blur',
            fields: {
                nome: {
                    identifier: 'nome',
                    rules: [
                        { type: 'empty', prompt: 'Informe o nome' }
                    ]
                },
                email: {
                    identifier: 'email',
                    rules: [
                        { type: 'empty', prompt: 'Informe o e-mail' },
                        { type: 'email', prompt: 'Informe um e-mail válido' }
                    ]
                },
                celular: {
                    identifier: 'celular',
                    rules: [
                        { type: 'empty', prompt: 'Informe o telefone' },
                        {
                            type: "regExp",
                            value: /(^|\()?\s*(\d{2})\s*(\s|\))*(9?\d{4})(\s|-)?(\d{4})($|\n)/u,
                            prompt: "Telefone inválido - Exemplo: (48) 3067-6768 ou (48) 98825-4902"
                        }
                    ]
                },
                assunto: {
                    identifier: 'assunto',
                    rules: [
                        { type: 'empty', prompt: 'Informe o assunto' }
                    ]
                },
                mensagem: {
                    identifier: 'mensagem',
                    rules: [
                        { type: 'empty', prompt: 'Informe a mensagem' }
                    ]
                },
            },
            onSuccess: function () {
                enviarFaleConosco();
            }
        });

    $('#formContato input, #formContato textarea').keyup(function () {
        $("[name=" + this.name + "Preenchido]").val(this.value);
    });

    $(document).on("click", "#carregarUltimoContato", function () {
        carregarUltimoContato();
    })
});