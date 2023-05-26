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



module.exports = router;