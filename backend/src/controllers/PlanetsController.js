
const connection = require('../database/connection');
const crypto = require('crypto'); //chave aleatoria em hex
const swapi = require('../services/SwapiServices')
const exception = require('../../exception');

function ErrorHandler(res, err) {
    if (err instanceof exception) {
        return res.status(err.statusCode).send({
            error: err.message,
        });
    }

    console.error(err);
    return res.status(500).send({
        error: 'Internal server error',
    });
}


module.exports = {

    //GET
    async index(req, res) {
        try {
            const response = await connection('planets').select('*');

            return res.json(response);
        } catch (err) {
            return ErrorHandler(res, err);
        }

    },

    //POST
    async create(req, res) {
        try {
            const { name, climate, ground } = req.body;
            const id = crypto.randomBytes(4).toString('HEX'); // gera o id automatico cryptografado em na base hex
            const showmovie = await swapi.getShowMovie(name)

            await connection('planets').insert({
                id,
                name,
                climate,
                ground,
                showmovie,

            })

            return res.json({ id });
        } catch (err) {
            return ErrorHandler(res, err);
        }
    },

    //DELETE
    async delete(req, res) {
        try {
            const { id } = req.params;

           const reponse = await connection('planets').where('id', id).delete()
           if (reponse == '') {
            throw new exception(404, 'Not found');

        }
            return res.status(204).send();
        } catch (err) {
            return ErrorHandler(res, err);
        }
    },



    //PUT
    async update(req, res) {
        try {
            const { id } = req.params

            const { name, climate, ground } = req.body;
            const response = await connection('planets').where('id', id).update({
                name,
                climate,
                ground,

            })
            if (response == '') {
                throw new exception(404, 'Not found');

            }
            return res.status(204).send();
        } catch (err) {
            return ErrorHandler(res, err);
        }
    },

    //Get por nome
    async getByName(req, res) {
        try {
            const { name } = req.params;

            const response = await connection('planets').where('name', name).select('*')
            if (response == '') {
                throw new exception(404, 'Not found');
            }
            return res.json(response);
        } catch (err) {
            return ErrorHandler(res, err);
        }
    },

    //Get por id
    async getById(req, res) {
        try {
            const { id } = req.params;

            const response = await connection('planets').where('id', id).select('*')
            //console.log(response)
            if (response == '') {
                throw new exception(404, 'Not found');
            }
            return res.json(response);
        } catch (err) {
            return ErrorHandler(res, err);
        }
    },

    //GET na swapi passando o nome do planeta e retornando quantidade de filmes
    async CheckCountMovies(req, res) {
        try {
            const { name } = req.params

            const filmes = await swapi.getShowMovie(name)

            return res.json({ filmes });
        } catch (err) {
            return ErrorHandler(res, err);
        }
    },



};