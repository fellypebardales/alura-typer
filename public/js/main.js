var tempoInicial = $("#tempo_digitacao").text();
var campo = $(".campo_digitacao");


$(function() {
    atualizaTamanhofrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao_reiniciar").click(reiniciarJogo);
})

function atualizaTamanhofrase() {
    var frase = $(".frase").text();
    var numeroPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho_frase");
    tamanhoFrase.text(numeroPalavras);
}


function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();
        
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador_palavras").text(qtdPalavras);
        
        var qtdCaracteres = conteudo.length;
        $("#contador_caracteres").text(qtdCaracteres);
    });
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda_correta");
            campo.removeClass("borda_errada");
        } else {
            campo.addClass("borda_errada");
            campo.removeClass("borda_correta");
        }

    })
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo_digitacao").text();
    campo.one("focus", function() {
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo_digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.addClass("campo_desativado");
    inserePlacar();
}

function reiniciarJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador_palavras").text("0");
    $("#contador_caracteres").text("0");
    $("#tempo_digitacao").text(tempoInicial)
    inicializaCronometro();
    campo.removeClass("campo_desativado");
    campo.removeClass("borda_errada");
    campo.removeClass("borda_correta");
}

