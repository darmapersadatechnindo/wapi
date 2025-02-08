const { sessions } = require('../sessions');

/**
 * Handles chat-related events for Socket.IO.
 * @param {Socket} socket - The connected Socket.IO client.
 */
const chatHandler = (socket) => {
  /**
   * Gets information about a chat.
   * @event getClassInfo
   * @param {Object} data - Data payload.
   * @param {string} data.sessionId - The session ID.
   * @param {string} data.chatId - The chat ID.
   * @param {Function} callback - Callback function to return response.
   */

  /**
   * Fetches messages from a chat.
   * @event fetchMessages
   */
  socket.on('fetchMessages', async ({ sessionId, chatId }) => {
    try {
      const client = sessions.get(sessionId);
      const chat = await client.getChatById(chatId);
      if (!chat) return callback({ success: false, error: 'Chat not Found' });
      const messages = await chat.fetchMessages({});
      socket.emit("waClient", { event: "fetchMessages", sessionId, data: messages })
    } catch (error) {
      socket.emit('sessionError', { success: false, message: error });
    }
  });

  /**
   * Gets the contact for a chat.
   * @event getContact
   */
  socket.on('getContact', async ({ sessionId, chatId }) => {
    try {
      const client = sessions.get(sessionId);
      const chat = await client.getChatById(chatId)
      const contact = await chat.getContact();
      socket.emit("waClient", { event: "getContact", sessionId, data: contact })
    } catch (error) {
      socket.emit('sessionError', { success: false, message: error });
    }
  });

}

module.exports = { chatHandler };
