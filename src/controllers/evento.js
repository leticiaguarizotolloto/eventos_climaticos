
const con = require('../db')

const cadastrar = (req, res) => {
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body

    try {
        const query = 'INSERT INTO evento (usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto) VALUES (?, ?, ?, ?, ?, ?);'

        con.query(query, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar evento' })
            } else {
                const novoEvento = req.body
                novoEvento.id = results.insertId

                res.status(201).json({
                    message: 'Evento cadastrado com sucesso',
                    evento: novoEvento
                })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            error: 'Erro ao cadastrar evento',
            details: 'Informe { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto }'
        })
    }
}

const listar = (req, res) => {
    const query = 'SELECT * FROM evento;'

    con.query(query, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar eventos' })
        } else {
            res.json(results)
        }
    })
}

const atualizar = (req, res) => {
    const { id } = req.params
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body

    const query = 'UPDATE evento SET usuarioId = ?, cidade = ?, tipoEvento = ?, temperaturaMaxima = ?, data = ?, nivelImpacto = ? WHERE id = ?;'

    con.query(query, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao atualizar evento' })
        } else {
            res.json({ message: 'Evento atualizado com sucesso' })
        }
    })
}

const excluir = (req, res) => {
    const { id } = req.params

    const query = 'DELETE FROM evento WHERE id = ?;'

    con.query(query, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao excluir evento' })
        } else {
            res.json({ message: 'Evento excluído com sucesso' })
        }
    })
}

const resumo = (req, res) => {
    const query = `
        SELECT
            (SELECT AVG(temperaturaMaxima) FROM evento) AS mediaTemperaturas
    `

    con.query(query, (err, resultado) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao gerar resumo' })
        } else {
            const queryEventos = 'SELECT * FROM evento;'

            con.query(queryEventos, (err, eventos) => {
                if (err) {
                    console.error(err)
                    res.status(500).json({ error: 'Erro ao listar eventos' })
                } else {
                    res.json({
                        eventos: eventos,
                        mediaTemperaturas: resultado[0].mediaTemperaturas
                    })
                }
            })
        }
    })
}


module.exports = {
    cadastrar,
    listar,
    atualizar,
    excluir,
    resumo
}
