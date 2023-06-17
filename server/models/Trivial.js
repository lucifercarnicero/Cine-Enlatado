const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trivialSchema = new Schema({
  pregunta: {
    type: String,
    required: true
  },
  opciones: {
    type: [String],
    required: true
  },
  respuesta: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Trivial', trivialSchema);