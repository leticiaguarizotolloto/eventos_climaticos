const con = require('../db')

const cadastrarEvento = (req, res) => {
    const { cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId } = req.body
    try {
        const query = 'INSERT INTO evento (cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId) VALUES (?, ?, ?, ?, ?, ?)'
        con.query(query, [cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar evento' })
            } else {
                const novoEvento = req.body
                novoEvento.id = results.insertId
                res.status(201).json({ message: 'Evento cadastrado com sucesso', user: novoEvento })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar evento', details: 'Informe {cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId}' })
    }
}

const listarEvento = (req, res) => {
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
const alterarEvento = (req, res) => {
    const {cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId } = req.body
    try { 
       const query = 'INSERT INTO evento (cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId) VALUES (?, ?, ?, ?, ?, ?)'
        con.query(query, [cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao aleterar evento' })
            } else {
                const novoEvento = req.body
                novoEvento.id = results.insertId
                res.status(201).json({ message: 'Evento alterado com sucesso', user: novoEvento })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao alterar evento', details: 'Informe {cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId}' })
    }
}

const excluirEvento = (req, res) => {
    const id =Number( req.params.id);

    try {
        const query = 'DELETE FROM evento WHERE id = ?;';

        con.query(query, [id], (err, results) => {
            if (err) {
                console.error(err);
                 res.status(500).json({ error: 'Erro no banco de dados' });
            }else{
                if(results.affectedRows != 0){
                    res.json(results)
                }else{
                res.status(404)
            }
        }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao excluir usuário', details: 'Informe id como parametro'})
            }       
}           
const resumo = (req, res) => {
    const query = 'SELECT * FROM evento;';

    con.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro no banco de dados' });
        }
        if (results.length === 0) {
            return res.json({ eventos: [], mediaTemperatura: 0 });
        }

        const soma = results.reduce((acc, evento) => acc + Number(evento.temperaturaMaxima), 0);
        const media = soma / results.length;
        
        res.json({
            eventos: results,
            mediaTemperatura: Number(media.toFixed(2))
        });
    });
};


module.exports = {
    cadastrarEvento,
    listarEvento,
    alterarEvento,
    excluirEvento,
    resumo
}