const express = require('express');
const router = express.Router();
const ciclosController = require('../controllers/ciclos');

// Rutas para ciclos
router.post('/crear', ciclosController.crearCiclo);
router.delete('/eliminar/:id', ciclosController.eliminarCiclo);
router.patch('/editar/:id', ciclosController.editarCiclo);
router.get('/buscar', ciclosController.buscarCiclos);
router.get('/obtener', ciclosController.obtenerCiclos);
router.get('/get/:id', ciclosController.getCiclo);
router.post('/like/:id', ciclosController.like);
router.post('/dislike/:id', ciclosController.dislike);
router.get('/get/autor/:id', ciclosController.getCiclosByAutor);
router.get('/get/comentarios/:id', ciclosController.getComentarios);
router.post('/add/comentario/:id', ciclosController.addComentario);

// Rutas para comentarios
//router.get('/coments', ciclosController.getComents);
//router.post('/coments', ciclosController.addComent);


module.exports = router;