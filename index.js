const customExpress = require("./config/customExpress")
const conexao = require("./infraestrutura/conexao")
const Tabelas = require("./infraestrutura/tabelas")

conexao.connect((erro) => {
    if(erro){
        console.log("Erro ao conectar ao DB\n", erro)
    } else {
        console.log("Conectado com sucesso ao DB")
        Tabelas.init(conexao)
        const app = customExpress()

        app.listen(3000, () => console.log("Servidor rodando em localhost:3000"))
    }
})