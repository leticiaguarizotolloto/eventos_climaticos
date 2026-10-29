const con = require('../db')

const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const query = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, password(?));'
        con.query(query, [nome, email, senha], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar usuário' })
            } else {
                const novoUsuario = req.body
                novoUsuario.id = results.insertId
                res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: novoUsuario })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: 'Informe { nome, email, senha }' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM usuario;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar usuários' })
        } else {
            res.json(results)
        }
    })
}
const alterar = (req, res) => {
    const {nome, email, senha} = req.body
    try { 
       const query = 'UPDATE usuario (nome, email,senha) VALUES (?, ?, ?)'
        con.query(query, [nome, email, senha], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao alterar usuario' })
           if (results.affectedRows !== 0) {
                    res.status(200).json({ 
                        message: 'Usuario alterado com sucesso', 
                        user: { nome, email, senha } 
                    });
                } else {
                    res.status(404).json({ error: 'Usuário não encontrado' });
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao processar requisição' });
    }
};

const excluir = (req, res) => {
    const email = req.params.email;

    try {
        const query = 'DELETE FROM usuario WHERE email = ?;';

        con.query(query, [email], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro no banco de dados' });
            } else {
                if (results.affectedRows != 0) {
                    res.json(results);
                } else {
                    res.status(404).json({ error: 'Usuário não encontrado' });
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao excluir usuário', details: 'Informe o email como parametro' });
    }       
};
const login = (req, res) => {
    
    const { email, senha } = req.body;

    try {
       
        const query = 'SELECT nome, email FROM usuario WHERE email = ? AND senha = ?;';

        con.query(query, [email, senha], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro no banco de dados' });
            }

            
            if (results.length === 0) {
                return res.status(404).json({ error: 'Usuário ou senha incorretos' });
            }
            res.json({
                message: 'Login realizado com sucesso!',
                user: results[0]
            });
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao processar o login' });
    }
};

module.exports = {
    cadastrar,
    listar,
    alterar,
    excluir,
    login
}