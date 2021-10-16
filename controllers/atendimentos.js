module.exports = app => {
    app.get("/atendimentos", (req, res) => res.send("Rota de Atendimentos atualizando o GET"))
}