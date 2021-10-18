const fs = require("fs")
const path = require("path")

//faz leitura e escrita de forma síncrona, então pára tudo enquanto roda
// fs.readFile("../assets/salsicha.jpg", (erro, buffer) => {
//     console.log("Imagem no buffer")
//     //console.log(buffer)

//     fs.writeFile("../assets/salsicha2.jpg", buffer, (erro) => {
//         console.log("Imagem do buffer escrita em arquivo")
//     })
// })

//faz leitura de forma assíncrona, então permite rodar em paralelo
// fs.createReadStream("../assets/salsicha.jpg")
//     .pipe(fs.createWriteStream("../assets/salsicha-stream.jpg"))
//     .on("finish", () => console.log("Imagem de salsicha stream escrita com sucesso"))


module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ["jpg", "jpeg", "png"]
    const tipo = path.extname(caminho)
    const tipoValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if (tipoValido) {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on("finish", () => callbackImagemCriada(false, novoCaminho))
    } else {
        const erro = "Tipo do arquivo é inválido"
        console.log("Erro! Tipo inválido")
        callbackImagemCriada(erro)
    }
}
