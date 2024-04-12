let listaNumSorteados = [];
let numertoMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function exibirMensagemInicial() {
  exibirTextoTela("h1", "Jogo do número secreto");
  exibirTextoTela("p", "Escolha um número de 0 a 10");
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;
  if (chute == numeroSecreto) {
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";

    exibirTextoTela("h1", "Acertou!");
    exibirTextoTela(
      "p",
      `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
    );

    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoTela("p", "O número secreto é menor");
    } else {
      exibirTextoTela("p", "O número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numEscolhido = parseInt(Math.random() * numertoMaximo + 1);
  let quantidadeElementosLista = listaNumSorteados.length;

  if (quantidadeElementosLista == numertoMaximo) {
    listaNumSorteados = [];
  }

  if (listaNumSorteados.includes(numEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumSorteados.push(numEscolhido);
    return numEscolhido;
  }
}

function limparCampo() {
  document.querySelector("input").value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", "disabled");
}
