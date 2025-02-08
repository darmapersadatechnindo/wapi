const { sessions } = require('../sessions')
const { sendErrorResponse } = require('../utils')

/**
 * Menangani event terkait pesan untuk Socket.IO.
 * @param {Socket} socket - Klien Socket.IO yang terhubung.
 */
const messageHandler = (socket) => {
  /**
   * Mendapatkan pesan berdasarkan ID dari chat tertentu.
   * @async
   * @param {Object} data - Data event.
   * @param {string} data.sessionId - ID sesi pengguna.
   * @param {string} data.messageId - ID pesan yang ingin diambil.
   * @param {string} data.chatId - ID chat tempat pesan berada.
   * @param {Function} callback - Fungsi callback untuk mengembalikan hasil.
   */
  socket.on('getMessage', async (data, callback) => {
    try {
      const { sessionId, messageId, chatId } = data
      const client = sessions.get(sessionId)
      const chat = await client.getChatById(chatId)
      const messages = await chat.fetchMessages({ limit: 100 })
      const message = messages.find((msg) => msg.id.id === messageId)
      if (!message) throw new Error('Pesan tidak ditemukan')
      callback({ success: true, message })
    } catch (error) {
      callback({ success: false, error: error.message })
    }
  })

  /**
   * Menghapus pesan.
   * @async
   * @param {Object} data - Data event.
   * @param {string} data.sessionId - ID sesi pengguna.
   * @param {string} data.messageId - ID pesan yang ingin dihapus.
   * @param {string} data.chatId - ID chat tempat pesan berada.
   * @param {boolean} data.everyone - Jika true, pesan akan dihapus untuk semua orang.
   * @param {Function} callback - Fungsi callback untuk mengembalikan hasil.
   */
  socket.on('deleteMessage', async (data, callback) => {
    try {
      const { sessionId, messageId, chatId, everyone } = data
      const client = sessions.get(sessionId)
      const chat = await client.getChatById(chatId)
      const messages = await chat.fetchMessages({ limit: 100 })
      const message = messages.find((msg) => msg.id.id === messageId)
      if (!message) throw new Error('Pesan tidak ditemukan')
      const result = await message.delete(everyone)
      callback({ success: true, result })
    } catch (error) {
      callback({ success: false, error: error.message })
    }
  })

  /**
   * Mengunduh media dari pesan.
   * @async
   * @param {Object} data - Data event.
   * @param {string} data.sessionId - ID sesi pengguna.
   * @param {string} data.messageId - ID pesan yang mengandung media.
   * @param {string} data.chatId - ID chat tempat pesan berada.
   * @param {Function} callback - Fungsi callback untuk mengembalikan hasil.
   */
  socket.on('downloadMedia', async (data, callback) => {
    try {
      const { sessionId, messageId, chatId } = data
      const client = sessions.get(sessionId)
      const chat = await client.getChatById(chatId)
      const messages = await chat.fetchMessages({ limit: 100 })
      const message = messages.find((msg) => msg.id.id === messageId)
      if (!message) throw new Error('Pesan tidak ditemukan')
      const media = await message.downloadMedia()
      callback({ success: true, media })
    } catch (error) {
      callback({ success: false, error: error.message })
    }
  })

  /**
   * Meneruskan pesan ke chat lain.
   * @async
   * @param {Object} data - Data event.
   * @param {string} data.sessionId - ID sesi pengguna.
   * @param {string} data.messageId - ID pesan yang akan diteruskan.
   * @param {string} data.chatId - ID chat asal pesan.
   * @param {string} data.destinationChatId - ID chat tujuan penerusan pesan.
   * @param {Function} callback - Fungsi callback untuk mengembalikan hasil.
   */
  socket.on('forwardMessage', async (data, callback) => {
    try {
      const { sessionId, messageId, chatId, destinationChatId } = data
      const client = sessions.get(sessionId)
      const chat = await client.getChatById(chatId)
      const messages = await chat.fetchMessages({ limit: 100 })
      const message = messages.find((msg) => msg.id.id === messageId)
      if (!message) throw new Error('Pesan tidak ditemukan')
      const result = await message.forward(destinationChatId)
      callback({ success: true, result })
    } catch (error) {
      callback({ success: false, error: error.message })
    }
  })

  /**
   * Memberikan reaksi pada pesan.
   * @async
   * @param {Object} data - Data event.
   * @param {string} data.sessionId - ID sesi pengguna.
   * @param {string} data.messageId - ID pesan yang akan diberikan reaksi.
   * @param {string} data.chatId - ID chat tempat pesan berada.
   * @param {string} data.reaction - Reaksi yang akan diberikan.
   * @param {Function} callback - Fungsi callback untuk mengembalikan hasil.
   */
  socket.on('reactMessage', async (data, callback) => {
    try {
      const { sessionId, messageId, chatId, reaction } = data
      const client = sessions.get(sessionId)
      const chat = await client.getChatById(chatId)
      const messages = await chat.fetchMessages({ limit: 100 })
      const message = messages.find((msg) => msg.id.id === messageId)
      if (!message) throw new Error('Pesan tidak ditemukan')
      const result = await message.react(reaction)
      callback({ success: true, result })
    } catch (error) {
      callback({ success: false, error: error.message })
    }
  })

  /**
   * Membalas pesan tertentu.
   * @async
   * @param {Object} data - Data event.
   * @param {string} data.sessionId - ID sesi pengguna.
   * @param {string} data.messageId - ID pesan yang akan dibalas.
   * @param {string} data.chatId - ID chat tempat pesan berada.
   * @param {string} data.content - Isi pesan balasan.
   * @param {string} data.destinationChatId - ID chat tujuan balasan (opsional).
   * @param {Object} data.options - Opsi tambahan untuk balasan.
   * @param {Function} callback - Fungsi callback untuk mengembalikan hasil.
   */
  socket.on('replyMessage', async (data, callback) => {
    try {
      const { sessionId, messageId, chatId, content, destinationChatId, options } = data
      const client = sessions.get(sessionId)
      const chat = await client.getChatById(chatId)
      const messages = await chat.fetchMessages({ limit: 100 })
      const message = messages.find((msg) => msg.id.id === messageId)
      if (!message) throw new Error('Pesan tidak ditemukan')
      const repliedMessage = await message.reply(content, destinationChatId, options)
      callback({ success: true, repliedMessage })
    } catch (error) {
      callback({ success: false, error: error.message })
    }
  })
}

module.exports = {messageHandler} 
