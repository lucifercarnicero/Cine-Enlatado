const mongoose = require("mongoose");
const { Schema } = require("mongoose");


const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type:String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type:String,
        required: [true, 'El password es obligatorio']
    },
    esAdmin: {
        type: Boolean,
        default: false
    }
})

//OJO CON LA IMPORTACIÓN PORQUE HACE FALTA PASARLO POR EL MODELO
module.exports = mongoose.model('Usuario', UsuarioSchema);