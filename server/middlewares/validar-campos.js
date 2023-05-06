
const { response } = require('express');
const { validationResult } = require('express-validator');

//NEXT importante para que continue con el siguiente middleware
const validarCampos = (req, res=response, next) => {

    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();

}

//exportacion por nombre, por si tenemos más de uno
module.exports = {
    validarCampos
}