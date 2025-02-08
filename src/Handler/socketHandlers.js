const { chatHandler } = require('./chatHandler');
const { clientHandler } = require('./clientHandler');
const { sessionHandler } = require('./sessionHandler');
const { messageHandler } = require('./messageHandler');
const { contactHandler } = require('./contactHandler');

/**
 * Menggabungkan semua handler untuk Socket.IO.
 * 
 * @param {Socket} socket - Objek socket yang terhubung.
 */
const registerHandlers = (socket) => {
  chatHandler(socket);
  clientHandler(socket);
  sessionHandler(socket);
  messageHandler(socket);
  contactHandler(socket);
};

module.exports = { registerHandlers };
