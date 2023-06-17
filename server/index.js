const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();
const path = require('path');




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
app.use('/api/trivial', require('./routes/trivial'));
app.use('/api/ranking', require('./routes/ranking'));


app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  
app.get('/home/list', (req, res) => {
res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/dashboard/mis-ciclos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

app.get('/dashboard/crear', (req, res) => {
res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/home/random', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
    });

    app.get('/auth/login', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
        });

        app.get('/auth/register', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
            });


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});