const { MessageMedia, Location, Buttons, List, Poll } = require('whatsapp-web.js');
const { sessions } = require('../sessions');

/**
 * Handles client-related events for Socket.IO.
 * @param {Socket} socket - The connected Socket.IO client.
 */
const clientHandler = (socket) => {
  /**
   * Sends a message to a chat.
   * @event sendMessage
   */
  socket.on('sendMessage', async ({ sessionId, chatId, content, contentType, options }, callback) => {
    try {
      const client = sessions.get(sessionId);
      let messageOut;

      switch (contentType) {
        case 'string':
          if (options?.media) {
            options.media = new MessageMedia(options.media.mimetype, options.media.data);
          }
          messageOut = await client.sendMessage(chatId, content, options);
          break;

        case 'MessageMediaFromURL':
          const mediaFromURL = await MessageMedia.fromUrl(content, { unsafeMime: true });
          messageOut = await client.sendMessage(chatId, mediaFromURL, options);
          break;

        case 'Location':
          messageOut = await client.sendMessage(chatId, new Location(content.latitude, content.longitude, content.description), options);
          break;

        case 'Buttons':
          messageOut = await client.sendMessage(chatId, new Buttons(content.body, content.buttons, content.title, content.footer), options);
          break;

        case 'List':
          messageOut = await client.sendMessage(chatId, new List(content.body, content.buttonText, content.sections, content.title, content.footer), options);
          break;

        case 'Poll':
          messageOut = await client.sendMessage(chatId, new Poll(content.pollName, content.pollOptions, content.options), options);
          break;

        default:
          return callback({ success: false, error: 'Invalid contentType' });
      }

      callback({ success: true, message: messageOut });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Checks if a number is registered on WhatsApp.
   * @event isRegisteredUser
   */
  socket.on('isRegisteredUser', async ({ sessionId, number }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const result = await client.isRegisteredUser(number);
      callback({ success: true, result });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Creates a new WhatsApp group.
   * @event createGroup
   */
  socket.on('createGroup', async ({ sessionId, name, participants }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const response = await client.createGroup(name, participants);
      callback({ success: true, response });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Sets the WhatsApp status (bio).
   * @event setStatus
   */
  socket.on('setStatus', async ({ sessionId, status }, callback) => {
    try {
      const client = sessions.get(sessionId);
      await client.setStatus(status);
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Retrieves the user's contacts.
   * @event getContacts
   */
  socket.on('getContacts', async ({ sessionId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const contacts = await client.getContacts();
      callback({ success: true, contacts });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Retrieves the user's chat list.
   * @event getChats
   */
  socket.on('getChats', async ({ sessionId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const chats = await client.getChats();
      callback({ success: true, chats });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Accepts a WhatsApp group invitation.
   * @event acceptInvite
   */
  socket.on('acceptInvite', async ({ sessionId, inviteCode }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const result = await client.acceptInvite(inviteCode);
      callback({ success: true, result });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Retrieves the current WhatsApp Web version.
   * @event getWWebVersion
   */
  socket.on('getWWebVersion', async ({ sessionId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const version = await client.getWWebVersion();
      callback({ success: true, version });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });
};

module.exports = {clientHandler};
