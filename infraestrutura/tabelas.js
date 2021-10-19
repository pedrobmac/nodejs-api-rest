class Tabelas {
    init(conexao) {
        console.log("Tabelas foram chamadas")
        this.conexao = conexao

        this.criarAtendimentos()
        this.criarPets()
    }

    criarAtendimentos() {
        const sql = "CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(50), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao date NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY (id))"

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log("Erro ao criar tabela atendimentos\n", erro)
            } else {
                console.log("Tabela atendimentos pronta")
            }
        })
    }

    criarPets() {
        const sql = "CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, imagem varchar(200), PRIMARY KEY (id))"

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log("Erro ao criar tabela pets\n", erro)
            } else {
                console.log("Tabela pets pronta")
            }
        })
    }
}

module.exports = new Tabelas