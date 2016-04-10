(function() {

module.exports = {
    /**
     * Before connection (optional, just for faye)
     * @param {client} client connection
     */
    beforeConnect : function(client) {
      // Example:
      // client.setHeader('Authorization', 'OAuth abcd-1234');
      client.disable('websocket');
    },

    /**
     * On client connection (required)
     * @param {client} client connection
     * @param {done} callback function(err) {}
     */
    onConnect : function(client, done) {
      // Faye client
      // client.subscribe('/channel', function(message) { });

      // Socket.io client
      client.emit('new-messageLatido', {
        idMascota: "1",
        idCollar: "1",
        idUsuario: "1",
        latido: "15",
        fecha: "2016/01/01 13:01:01"
       });
      done();
      // Primus client
      // client.write('Sailing the seas of cheese');

      // WAMP session
      // client.subscribe('com.myapp.hello').then(function(args) { });

    },

 };


})();
