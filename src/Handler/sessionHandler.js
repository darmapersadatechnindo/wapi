const qr = require('qr-image');
const QRCode = require('qrcode');
const { setupSession, deleteSession, reloadSession, validateSession, flushSessions, sessions } = require('../sessions');
const { sendErrorResponse, waitForNestedObject } = require('../utils');

/**
 * Handles session-related events for Socket.IO.
 * @param {Socket} socket - The connected Socket.IO client.
 */
const sessionHandler = (socket) => {
  
  /**
   * Starts a new session.
   * @param {Object} data - The session data.
   * @param {string} data.sessionId - The session ID.
   */
  socket.on('startSession', async (data) => {
    try {
      const { sessionId } = data;
      const setupSessionReturn = setupSession(sessionId);
      if (!setupSessionReturn.success) {
        socket.emit('sessionError', { success: false, message: setupSessionReturn.message });
        return;
      }
      await waitForNestedObject(setupSessionReturn.client, 'pupPage');
      socket.emit('sessionStarted', { success: true, message: setupSessionReturn.message });
    } catch (error) {
      socket.emit('sessionError', { success: false, message: error.message });
    }
  });

  /**
   * Gets the status of a session.
   * @param {Object} data - The session data.
   * @param {string} data.sessionId - The session ID.
   */
  socket.on('statusSession', async (data) => {
    try {
      const { sessionId } = data;
      const sessionData = await validateSession(sessionId);
      socket.emit('sessionStatus', sessionData);
    } catch (error) {
      socket.emit('sessionError', { success: false, message: error.message });
    }
  });

  /**
   * Gets the QR code for a session.
   * @param {Object} data - The session data.
   * @param {string} data.sessionId - The session ID.
   */
  socket.on('sessionQrCode', async (data) => {
    try {
      const { sessionId } = data;
      const session = sessions.get(sessionId);
      if (!session) {
        socket.emit('sessionError', { success: false, message: 'session_not_found' });
        return;
      }
      if (session.qr) {
        const qrImageUrl = await QRCode.toDataURL(session.qr);
        socket.emit('sessionQrCode', { success: true, qr: qrImageUrl });
      } else {
        socket.emit('sessionError', { success: false, message: 'QR code not ready or already scanned' });
      }
    } catch (error) {
      socket.emit('sessionError', { success: false, message: error.message });
    }
  });

  /**
   * Restarts a session.
   * @param {Object} data - The session data.
   * @param {string} data.sessionId - The session ID.
   */
  socket.on('restartSession', async (data) => {
    try {
      const { sessionId } = data;
      const validation = await validateSession(sessionId);
      if (validation.message === 'session_not_found') {
        socket.emit('sessionError', validation);
        return;
      }
      await reloadSession(sessionId);
      socket.emit('sessionRestarted', { success: true, message: 'Restarted successfully' });
    } catch (error) {
      socket.emit('sessionError', { success: false, message: error.message });
    }
  });

  /**
   * Terminates a session.
   * @param {Object} data - The session data.
   * @param {string} data.sessionId - The session ID.
   */
  socket.on('terminateSession', async (data) => {
    try {
      const { sessionId } = data;
      const validation = await validateSession(sessionId);
      if (validation.message === 'session_not_found') {
        socket.emit('sessionError', validation);
        return;
      }
      await deleteSession(sessionId, validation);
      socket.emit('sessionTerminated', { success: true, message: 'Logged out successfully' });
    } catch (error) {
      socket.emit('sessionError', { success: false, message: error.message });
    }
  });

  /**
   * Terminates all inactive sessions.
   */
  socket.on('terminateInactiveSessions', async () => {
    try {
      await flushSessions(true);
      socket.emit('inactiveSessionsTerminated', { success: true, message: 'Flush completed successfully' });
    } catch (error) {
      socket.emit('sessionError', { success: false, message: error.message });
    }
  });

  /**
   * Terminates all sessions.
   */
  socket.on('terminateAllSessions', async () => {
    try {
      await flushSessions(false);
      socket.emit('allSessionsTerminated', { success: true, message: 'Flush completed successfully' });
    } catch (error) {
      socket.emit('sessionError', { success: false, message: error.message });
    }
  });
};

module.exports = {sessionHandler};
