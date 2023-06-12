const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();



// Servidor/App de express
const app = express();

//Base de datos
dbConnection()

//Directorio publico
app.use(express.static('public'));

// CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());



//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ciclos', require('./routes/ciclo'));




app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});