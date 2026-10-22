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

module.exports = {
    cadastrar,
    listar
}