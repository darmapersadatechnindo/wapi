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
  socket.on('getClassInfo', async ({ sessionId, chatId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const chat = await client.getChatById(chatId);
      if (!chat) return callback({ success: false, error: 'Chat not Found' });
      callback({ success: true, chat });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Clears all messages in a chat.
   * @event clearMessages
   */
  socket.on('clearMessages', async ({ sessionId, chatId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const chat = await client.getChatById(chatId);
      if (!chat) return callback({ success: false, error: 'Chat not Found' });
      await chat.clearMessages();
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Clears typing or recording state in a chat.
   * @event clearState
   */
  socket.on('clearState', async ({ sessionId, chatId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const chat = await client.getChatById(chatId);
      if (!chat) return callback({ success: false, error: 'Chat not Found' });
      await chat.clearState();
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Deletes a chat.
   * @event deleteChat
   */
  socket.on('deleteChat', async ({ sessionId, chatId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const chat = await client.getChatById(chatId);
      if (!chat) return callback({ success: false, error: 'Chat not Found' });
      await chat.delete();
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Fetches messages from a chat.
   * @event fetchMessages
   */
  socket.on('fetchMessages', async ({ sessionId, chatId, searchOptions }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const chat = await client.getChatById(chatId);
      if (!chat) return callback({ success: false, error: 'Chat not Found' });
      const messages = await chat.fetchMessages(searchOptions);
      callback({ success: true, messages });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Gets the contact for a chat.
   * @event getContact
   */
  socket.on('getContact', async ({ sessionId, chatId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const chat = await client.getChatById(chatId);
      if (!chat) return callback({ success: false, error: 'Chat not Found' });
      const contact = await chat.getContact();
      callback({ success: true, contact });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Sends a recording state.
   * @event sendStateRecording
   */
  socket.on('sendStateRecording', async ({ sessionId, chatId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const chat = await client.getChatById(chatId);
      if (!chat) return callback({ success: false, error: 'Chat not Found' });
      await chat.sendStateRecording();
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Sends a typing state.
   * @event sendStateTyping
   */
  socket.on('sendStateTyping', async ({ sessionId, chatId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const chat = await client.getChatById(chatId);
      if (!chat) return callback({ success: false, error: 'Chat not Found' });
      await chat.sendStateTyping();
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });
};

module.exports = {chatHandler};
