const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {

    const payload = { uid, name };

    return new Promise((resolve, reject) => { 
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h',
        },(err,token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT')
            }else{
                resolve(token);
            }
        });
    });

    

}

module.exports = {
    generarJWT
}