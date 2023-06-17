const Ranking = require('../models/Ranking');

exports.getRanking = async (req, res) => {
    try {
        const ranking = await Ranking.find().sort({ aciertos: -1 });
        res.json(ranking);
    } catch (error) {
        console.log(error);
        res.json({ mensaje: 'Hubo un error al obtener el ranking.' });
    }
}


exports.postRanking = async (req, res) => {
    try {
        const nuevoRegistro = new Ranking(req.body);
        await nuevoRegistro.save();
        res.json({ mensaje: 'Registro creado correctamente.' });
    } catch (error) {
        console.log(error);
        res.json({ mensaje: 'Hubo un error al crear el registro.' });
    }
}