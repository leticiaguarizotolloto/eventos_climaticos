const express = require("express")
const router = express.Router()

const Usuario = require('./controllers/usuario')
const Evento = require ('./controllers/evento')
const rotaInicial = (req, res) => {
    res.json("Back-end Eventos Climáticos respondendo")
}

router.get('/',rotaInicial)
router.post('/usuario', Usuario.cadastrar)
router.get('/usuarios', Usuario.listar)
router.put('/usuario', Usuario.alterar)
router.delete('/usuario/:email', Usuario.excluir)
router.post('/usuario/login', Usuario.login)


router.get('/',rotaInicial)
router.post('/evento', Evento.cadastrarEvento)
router.get('/eventos', Evento.listarEvento)
router.put('/evento', Evento.alterarEvento)
router.delete('/evento/:id', Evento.excluirEvento)
router.get('/eventos/resumo', Evento.resumo)
module.exports = router