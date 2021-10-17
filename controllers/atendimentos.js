const Atendimento = require("../models/atendimentos")

module.exports = app => {
    app.get("/atendimentos", (req, res) => res.send("Rota de atendimentos, realizado um GET"))
    
    app.post("/atendimentos", (req, res) => {
        Atendimento.adiciona(req.body)
        res.send("Rota de atendimentos, realizado um POST")})
}