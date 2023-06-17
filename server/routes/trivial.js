const express = require('express');
const router = express.Router();
const trivialController = require('../controllers/trivial');


router.post('/crear', trivialController.crearPregunta);
router.delete('/eliminar/:id', trivialController.eliminarPregunta);
router.patch('/editar/:id', trivialController.editarPregunta);
router.get('/preguntas', trivialController.preguntas);


module.exports = router;