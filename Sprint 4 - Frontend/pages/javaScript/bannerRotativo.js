let imagens = ["imagem1.jpg", "imagem2.jpg"];

function TrocarImagem(imagem) {
    document.querySelector(".imagem_banner").src = "css/img/" + imagens[imagem];
}

let imagemAtual = 0;
TrocarImagem(imagemAtual);

setInterval(function() {
    imagemAtual++
    if (imagemAtual > 1) {
        imagemAtual = 0;
    }

    TrocarImagem(imagemAtual)
},4000);