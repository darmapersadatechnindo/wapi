const { sessions } = require('../sessions');

/**
 * Handles contact-related events for Socket.IO.
 * @param {Socket} socket - The connected Socket.IO client.
 */
const contactHandler = (socket) => {
  /**
   * Retrieves contact information.
   * @event getClassInfo
   */
  socket.on('getClassInfo', async ({ sessionId, contactId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const contact = await client.getContactById(contactId);
      if (!contact) return callback({ success: false, error: 'Contact not Found' });
      callback({ success: true, contact });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Blocks a contact.
   * @event block
   */
  socket.on('block', async ({ sessionId, contactId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const contact = await client.getContactById(contactId);
      if (!contact) return callback({ success: false, error: 'Contact not Found' });
      await contact.block();
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Retrieves a contact's "About" information.
   * @event getAbout
   */
  socket.on('getAbout', async ({ sessionId, contactId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const contact = await client.getContactById(contactId);
      if (!contact) return callback({ success: false, error: 'Contact not Found' });
      const about = await contact.getAbout();
      callback({ success: true, about });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Retrieves chat information of a contact.
   * @event getChat
   */
  socket.on('getChat', async ({ sessionId, contactId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const contact = await client.getContactById(contactId);
      if (!contact) return callback({ success: false, error: 'Contact not Found' });
      const chat = await contact.getChat();
      callback({ success: true, chat });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Retrieves formatted number of a contact.
   * @event getFormattedNumber
   */
  socket.on('getFormattedNumber', async ({ sessionId, contactId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const contact = await client.getContactById(contactId);
      if (!contact) return callback({ success: false, error: 'Contact not Found' });
      const formattedNumber = await contact.getFormattedNumber();
      callback({ success: true, formattedNumber });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Retrieves country code of a contact.
   * @event getCountryCode
   */
  socket.on('getCountryCode', async ({ sessionId, contactId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const contact = await client.getContactById(contactId);
      if (!contact) return callback({ success: false, error: 'Contact not Found' });
      const countryCode = await contact.getCountryCode();
      callback({ success: true, countryCode });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Retrieves profile picture URL of a contact.
   * @event getProfilePicUrl
   */
  socket.on('getProfilePicUrl', async ({ sessionId, contactId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const contact = await client.getContactById(contactId);
      if (!contact) return callback({ success: false, error: 'Contact not Found' });
      const profilePicUrl = await contact.getProfilePicUrl();
      callback({ success: true, profilePicUrl: profilePicUrl || null });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  /**
   * Unblocks a contact.
   * @event unblock
   */
  socket.on('unblock', async ({ sessionId, contactId }, callback) => {
    try {
      const client = sessions.get(sessionId);
      const contact = await client.getContactById(contactId);
      if (!contact) return callback({ success: false, error: 'Contact not Found' });
      await contact.unblock();
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });
};

module.exports = {contactHandler};
