//importamos el servidor de sockets
const {io} = require('../index');

//Menajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
 
     client.on('disconnect', () => {
    console.log('Cliente Desconectado');
   });

   client.on('mensaje', ( payload ) => {
        console.log('Mensaje de ',payload);
//con io emite a todos los usuarios conectados
        io.emit( 'mensaje', { admin: 'Nuevo mensaje para '+payload.nombre } );
//con client solo al especifico que ha recibido el emit
    //    client.emit( 'mensaje', { admin: 'Nuevo mensaje para '+payload.nombre } );
    });

 client.on('emitir-mensaje', ( payload ) => {
       console.log(payload);
        io.emit( 'nuevo-mensaje', {nombre:'Fernando', mensaje:'Mensaje de Fernando'} );// con io.emit envia a todos los usuarios
      // client.broadcast.emit( 'nuevo-mensaje', 'HEY!!!' );// envia a todos menos al que ha realizado la emision de nuevo mensaje
    });

});