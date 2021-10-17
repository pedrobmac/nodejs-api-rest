const moment = require("moment")
const conexao = require("../infraestrutura/conexao")

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS")
        const data = moment(atendimento.data, "DD/MM/YYYY HH:MM").format("YYYY-MM-DD HH:MM:SS")

        //validar dados de entrada
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 3

        //debug de data
        // console.log("Data: ", data)
        // console.log("Data criação: ", dataCriacao)
        // console.log("Data válida? ", dataValida)

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
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    lista(res) {
        const sql = "SELECT * FROM atendimentos"

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultado) => {
            const atendimento = resultado[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS")
        }

        const sql = "UPDATE atendimentos SET ? WHERE id = ?"

        conexao.query(sql, [valores, id], (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ valores, id })
            }
        })
    }

    deleta(id, res) {
        const sql = `DELETE FROM atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Atendimento