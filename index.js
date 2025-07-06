const express = require('express');
const path = require('path');
const { Server } = require("socket.io");

require('dotenv').config();

// App de Express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = new Server(server, {
          cors: {
            //direcciones especificas
            //origin: ["http://localhost:4200", "http://localhost:63621"],
             //cualquier direccion
             origin: '*',
            methods: ["GET", "POST"]
          }
        });


require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );


server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


