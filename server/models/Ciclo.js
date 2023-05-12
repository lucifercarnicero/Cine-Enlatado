const mongoose = require('mongoose');
const { Schema } = mongoose;

const peliculaSchema = new Schema({
    idExterno: String,
    // Otros campos si fueran necesarios
  });

const likeSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  fecha: Date
});

const cicloSchema = new Schema({
  nombre: String,
  descripcion: String,
  peliculas: [peliculaSchema],
  autor: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  likes: [likeSchema]
});

module.exports = mongoose.model('Ciclo', cicloSchema);