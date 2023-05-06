const { response } = require('express');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {

        //Verificar email (que no exista)

        const usuario = await Usuario.findOne({ email }); //busca alguien con ese email

        //si existe el usuario con ese email, se sale
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        } 

        //Crear usuario con el modelo

        const dbUser = new Usuario(req.body);


        //Hashear la contraseña

        const salt = bcrypt.genSaltSync(); //por defecto 10 vueltas
        dbUser.password = bcrypt.hashSync(password, salt);

        //Generar el JWT (Json Web Token) para q use para autenticas
        const token = await generarJWT(dbUser.id, name);
        

        //Crear usuario de BD
        await dbUser.save();

        //generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            password,
            token
        })
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Crear new user'
        })
        
    }

    
    
    
}

const loginUsuario = async(req, res = response) => {
   
    const { email, password } = req.body;

    try {
        //confirmamos si existe usuario con ese mail
        const dbUser = await Usuario.findOne({ email }); 
        
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        } 

        //confirmamos si el password es correcto
        const validPassword = bcrypt.compareSync(password, dbUser.password); //usamos el compare no crear hash

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no válido'
            })
        }

        //Generar el JWT (Json Web Token) para q use para autenticas
        const token = await generarJWT(dbUser.id, dbUser.name);

        //Respuesta del servicio (no necesaria pero la ponemos por tener constancia y aprender)
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Not login 4 u'
        })
    }
   
    
}

const renewToken = async(req, res = response) => {

    const { uid } = req;

    //Leer BBDD para obtener el name
    const dbUser = await Usuario.findById(uid);

    

    const token = await generarJWT(uid, dbUser.name);

    return res.json({
        ok: true,
        
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
        
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}