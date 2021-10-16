const express = require("express")
const consign = require("consign")

const app = express()

consign()
    .include("controllers")
    .into(app)

app.listen(3000, () => console.log("Servidor rodando em localhost:3000"))

app.get("/", (req, res) => res.send("Servidor executando"))
