const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rankingSchema = new Schema({
  jugador: {
    type: String,
    required: true
  },
  aciertos: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Ranking', rankingSchema);
