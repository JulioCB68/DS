const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(req, res) {
        const users = await connection('users').select('*');
        return res.json(users);
    },

    async create(req, res) {
        const {name, email, whatsapp, cnpj, city, uf} = req.body;

    const id = crypto.randomBytes(4).toString('HEX');
    console.log(id);
    
    await connection('users').insert({
        id,
        name,
        email,
        whatsapp,
        cnpj, 
        city,
        uf,
    })

    return res.json({id}); 
    }
}

