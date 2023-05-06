const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(400).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
        
        console.log(uid, name);

    } catch (error) {
        //el 401 es no autorizado
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    //Si todo OK
    next();
};

module.exports = {
    validarJWT
}