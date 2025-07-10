//importamos el servidor de sockets
const {io} = require('../index');
const Band = require('./models/band');
const Bands = require('./models/bands');
const bands = new Bands();

bands.addBand(new Band('Mecano') );
bands.addBand(new Band('Bon Jovi') );
bands.addBand(new Band('Heroes del Silencio') );
bands.addBand(new Band('Quuen') );
bands.addBand(new Band('Metallica') );

 console.log(bands);

//Menajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
 
    client.on('disconnect', () => {
    console.log('Cliente Desconectado');
   });

   //enviamos las bandas al cliente que se esta conectando
   client.emit('bandas activas',bands.getBands());
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

     client.on('vote-band', ( payload ) => {
       console.log(payload);
       bands.voteBand( payload.id);
       io.emit('bandas activas',bands.getBands());
      //io.emit( 'active-band', {nombre:'Fernando', mensaje:'Mensaje de Fernando'} );// con io.emit envia a todos los usuarios
      // client.broadcast.emit( 'nuevo-mensaje', 'HEY!!!' );// envia a todos menos al que ha realizado la emision de nuevo mensaje
    });
     client.on('add-band', ( payload ) => {
      const newBand = new Band(payload.name);
      bands.addBand(newBand );
       //bands.addBand({'name':payload.name,''});
      io.emit('bandas activas',bands.getBands());
       });
       
     client.on('delete-band', ( payload ) => {
      bands.deleteBand(payload.id );
      io.emit('bandas activas',bands.getBands());
       });

});