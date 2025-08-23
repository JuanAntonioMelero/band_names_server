const express = require('express');
const path = require('path');
const { Server } = require("socket.io");

require('dotenv').config();
//DB config
const { dbConecction } = require('./database/config');
dbConecction();
// App de Express
const app = express();

// Lectura y parseo del body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = new Server(server, {
  cors: {
    //direcciones especificas
    //origin: ["http://localhost:53867", "http://localhost:63621"],
    //cualquier direccion
    origin: '*',
    methods: ["GET", "POST"]
  }
});


require('./sockets/socket');




// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//Mis Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/productos', require('./routes/productos'));



server.listen(process.env.PORT, (err) => {

  if (err) throw new Error(err);

  console.log('Servidor corriendo en puerto', process.env.PORT);

});


