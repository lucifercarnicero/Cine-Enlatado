const Trivial = require('../models/Trivial');


exports.crearPregunta = async (req, res) => {
    try {
        const nuevaPregunta = new Trivial(req.body);
        await nuevaPregunta.save();
        res.json({ mensaje: 'Pregunta creada correctamente.' });
    } catch (error) {
        console.log(error);
        res.json({ mensaje: 'Hubo un error al crear la pregunta.' });
    }
    }


exports.eliminarPregunta = async (req, res) => {
    try {
        const { id } = req.params;
        await Trivial.findByIdAndDelete(id);
        res.json({ mensaje: 'Pregunta eliminada correctamente.' });
    } catch (error) {
        console.log(error);
        res.json({ mensaje: 'Hubo un error al eliminar la pregunta.' });
    }

}

exports.editarPregunta = async (req, res) => {

    try {
        const {id} = req.params;
        const pregunta = await Trivial.findById(id);
        if (!pregunta) {
            res.json({ mensaje: 'La pregunta no existe.' });
        }
        const preguntaEditada = req.body;
        await Trivial.findByIdAndUpdate(id, preguntaEditada);
        res.json({ mensaje: 'Pregunta editada correctamente.' });
    } catch (error) {
        console.log(error);
        res.json({ mensaje: 'Hubo un error al editar la pregunta.' });
        
    }

}

exports.preguntas = async (req, res) => {
    try {
        const preguntas = await Trivial.find();
        res.json(preguntas);
    } catch (error) {
        console.log(error);
        res.json({ mensaje: 'Hubo un error al obtener las preguntas.' });
    }
}