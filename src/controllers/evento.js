const con = require('../db')

const cadastrar = (req, res) => {

    const { nome } = req.body

    try {

        const query = 'INSERT INTO evento (nome) VALUES (?);'

        con.query(query, [nome], (err, results) => {

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
            details: 'Informe { nome }'
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
    const { nome } = req.body

    const query = 'UPDATE evento SET nome = ? WHERE id = ?;'

    con.query(query, [nome, id], (err, results) => {
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

module.exports = {
    cadastrar,
    listar,
    atualizar,
     excluir
}