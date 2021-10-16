const express = require("express")

const app = express()

app.listen(3000, () => console.log("Servidor rodando em localhost:3000"))

app.get("/", (req, res) => res.send("Servidor executando"))
app.get("/atendimentos", (req, res) => res.send("Rota de Atendimentos"))