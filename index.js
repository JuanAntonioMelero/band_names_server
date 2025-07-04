const express = require('express');
const path = require('path');
require('dotenv').config();

//app de express
const app=express();

// Servidor Node
const server = require('http').createServer(app);
//inicializamos el servidor socket 
//const io = require('socket.io')(server);

//inicializamos y exportamos el servidor socket
module.exports.io = require('socket.io')(server);
require('./sockets/socket'); 


//Path Publico
const publicPath= path.resolve(__dirname,'public')
app.use(express.static(publicPath));

//Cambiamos app por server
//app.listen(process.env.PORT, (error)=>{
server.listen(process.env.PORT, (error)=>{
    if (error) throw new Error(error);

    console.log('Servidor Corriendo en el puerto:',process.env.PORT);
});
