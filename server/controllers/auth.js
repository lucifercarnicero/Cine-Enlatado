const { response } = require('express');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const DEFAULT_ADMIN = false;

const crearUsuario = async (req, res = response) => {

    const { name, email, password, esAdmin = DEFAULT_ADMIN} = req.body;

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
            esAdmin,
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

        //Respuesta del servicio (no necesaria pero la ponemos por tener constancia y yo que sé)
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            esAdmin: dbUser.esAdmin,
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

const editar = async (req, res) => {
    try {
      const id = req.params.id;
      const { name = '', email = '', password = '' } = req.body;
  
      // Verificar qué campos se han proporcionado
      const updateFields = {};
      if (name) {
        updateFields.name = name;
      }
      if (email) {
        updateFields.email = email;
      }
      if (password) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);
        updateFields.password = hashedPassword;
      }
  
      await Usuario.findByIdAndUpdate(id, updateFields, { new: true });
  
      res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  };
  

  const getUsers = async (req, res) => {
    try {
        const users = await Usuario.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    };

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Usuario.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }

};



module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken,
    editar,
    getUsers,
    deleteUser,
    getUser
}