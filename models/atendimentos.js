const moment = require("moment")
const conexao = require("../infraestrutura/conexao")

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS")
        const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS")

        //validar dados de entrada
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 3

        const validacoes = [{
            nome: "data",
            valido: dataValida,
            mensagem: "Data deve ser maior ou igual à data atual"
        },
        {
            nome: "cliente",
            valido: clienteValido,
            mensagem: "Cliente deve ter pelo menos três caracteres"
        }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }
            const sql = "INSERT INTO atendimentos SET ?"

            conexao.query(sql, atendimentoDatado, (erro, resultado) => {
                if (erro) {
                    //console.log(erro)
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultado)
                }
            })
        }
    }
}

module.exports = new Atendimento