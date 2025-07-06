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
});