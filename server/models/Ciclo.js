const mongoose = require('mongoose');
const { Schema } = mongoose;

const peliculaSchema = new Schema({
    idExterno: String,
    image: String,
    title: String,
    descripcion: String,
    // Otros campos si fueran necesarios
  });

const likeSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  
});

const comentarioSchema = new Schema({
  usuario: String,
  comentario: String,
  id: String
});

const cicloSchema = new Schema({
  nombre: String,
  descripcion: String,
  peliculas: [peliculaSchema],
  autor: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  nombreAutor: String,
  likes: [likeSchema],
  numLikes: Number,
  comentarios: [comentarioSchema]
});




module.exports = mongoose.model('Ciclo', cicloSchema);