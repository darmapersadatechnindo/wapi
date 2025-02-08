const { app, io, server } = require("./Socket")
const bodyParser = require('body-parser')
const { restoreSessions,
    setupSession,
    validateSession,
    reloadSession,
    deleteSession,sessions } = require('./sessions')
const { routes } = require('./routes')
const fs = require('fs')
// Konfigurasi middleware
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: '50mb' })) // Sesuaikan limit sesuai kebutuhan
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

// Gunakan route utama
app.use('/', routes)


// Pulihkan sesi yang ada
restoreSessions()

const triggerWebhook = (webhookURL, sessionId, dataType, result) => {
    io.emit(webhookURL,{session:sessionId,event:dataType,data:result})
}
// Konfigurasi Socket.IO
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)
    //registerHandlers(socket) 
    socket.on("start", (sessionId) => {
        const setupSessionReturn = setupSession(sessionId)
        if (setupSessionReturn.success) {
            triggerWebhook("waClient", sessionId, "Start", setupSessionReturn.message)
        } else {
            triggerWebhook("waClient", sessionId, "Error", setupSessionReturn.message)
        }
    })
    socket.on("status", async (sessionId) => {
        const sessionData = await validateSession(sessionId)
        triggerWebhook("waClient", sessionId, "status", sessionData)
    })
    socket.on("restart", async (sessionId) => {
        const validation = await validateSession(sessionId)
        if (validation.message === 'Not Found') {
            triggerWebhook("waClient", sessionId, "restart", validation.message)
            return
        }
        await reloadSession(sessionId)
        triggerWebhook("waClient", sessionId, "restart", "Server berhasil direstart")
    })
    socket.on("delete", async (sessionId) => {
        const validation = await validateSession(sessionId)
        if (validation.message === 'Not Found') {
            triggerWebhook("waClient", sessionId, "delete", validation.message)
            return
        }
        await deleteSession(sessionId, validation)
        triggerWebhook("waClient", sessionId, "delete", "Session berhasil dihapus")
    })
    socket.on("info", async (sessionId) => {
        const validation = await validateSession(sessionId)
        if (validation.message === 'Not Found') {
            triggerWebhook("waClient", sessionId, "info", validation.message)
            return
        }
        const client = sessions.get(sessionId);
        const state = await client.getState();
        if (!state || state === "CONFLICT" || state === "UNPAIRED" || state === "UNLAUNCHED") {
            triggerWebhook("waClient", sessionId, "info", { error: "Client not ready" });
            return;
        }
        const info = await client.info
        const profilPic = await client.getProfilePicUrl(info.wid._serialized);
        const data = {
            name: info.pushname,
            wid: info.wid._serialized,
            platform: info.platform,
            img: profilPic || "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
        }
        triggerWebhook("waClient", sessionId, "info", data)
    })
    socket.on("profilPic", async ({ userId, sessionId }) => {
        const validation = await validateSession(sessionId)
        if (validation.message === 'Not Found') {
            triggerWebhook("waClient", sessionId, "profilPic", validation.message)
            return
        }
        const client = sessions.get(sessionId);
        const profilPic = await client.getProfilePicUrl(userId) || "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";
        triggerWebhook("waClient", sessionId, "profilPic", { userId, profilPic })
    })
    socket.on("sendSeen", async ({ chatId, sessionId }) => {
        const validation = await validateSession(sessionId)
        if (validation.message === 'Not Found') {
            triggerWebhook("waClient", sessionId, "sendSeen", validation.message)
            return
        }
        const client = sessions.get(sessionId);
        const chat = await client.getChatById(chatId)
        await chat.sendSeen()
        triggerWebhook("waClient", sessionId, "sendSeen", true)
    })
    socket.on("chats", async (sessionId) => {
        const validation = await validateSession(sessionId)
        if (validation.message === 'Not Found') {
            triggerWebhook("waClient", sessionId, "info", validation.message)
            return
        }
        const client = sessions.get(sessionId);
        const chats = await client.getChats();
        const listChats = await Promise.all(chats.map(async (chat) => {
            const lastMsg = chat.lastMessage?._data; 
            const msg = lastMsg?.type !== "chat"
                ? (lastMsg?.caption || null)
                : lastMsg?.body || null;

            return {
                id: chat.id._serialized,
                name: chat.name,
                fromMe: lastMsg?.id?.fromMe || false,
                message: msg,
                ack: lastMsg?.ack || 0,
                Type: lastMsg?.type || "unknown",
                pinned: chat.pinned || false,
                hasMedia: lastMsg?.hasMedia || false,
                unreadCount: chat.unreadCount,
                timestamp: lastMsg?.timestamp,
            };
        }));

        triggerWebhook("waClient", sessionId, "chats", listChats);
    })
    socket.on("getcontact", async ({ chatId, sessionId }) => {
        const validation = await validateSession(sessionId)
        if (validation.message === 'Not Found') {
            triggerWebhook("waClient", sessionId, "getcontact", validation.message)
            return
        }
        const client = sessions.get(sessionId);
        const contact = await client.getContactById(chatId)
        const foto = await contact.getProfilePicUrl();
        const chat = await client.getChatById(chatId)
        const chats = await chat.fetchMessages({ limit: 50 })
        const data = { ...contact, foto, chats }
        triggerWebhook("waClient", sessionId, "getcontact", data)
    })
    socket.on("getMessage", async ({ messageId, sessionId }) => {
        const validation = await validateSession(sessionId)
        if (validation.message === 'Not Found') {
            triggerWebhook("waClient", sessionId, "getMessage", validation.message)
            return
        }
        const client = sessions.get(sessionId);
        const message = await client.getMessageById(messageId)
        const media = await message.downloadMedia();
        const data = { messageId, media }
        triggerWebhook("waClient", sessionId, "getMessage", data)
    })
    socket.on("sendText", async ({ chatId, message, sessionId }) => {
        const validation = await validateSession(sessionId)
        if (validation.message === 'Not Found') {
            triggerWebhook("waClient", sessionId, "sendText", validation.message)
            return
        }
        const client = sessions.get(sessionId);
        const send = await client.sendMessage(chatId, message);
        triggerWebhook("waClient", sessionId, "sendText", send)
    })
    socket.on("sendMedia", async (data) => {
        const { chatId, sessionId, file, caption } = data;
        const validation = await validateSession(sessionId)
        if (validation.message === 'Not Found') {
            triggerWebhook("waClient", sessionId, "sendMedia", validation.message)
            return
        }
        const client = sessions.get(sessionId);
        const media = new MessageMedia(file.mimetype, file.data, file.filename);
        const send = await client.sendMessage(chatId, media, { caption });
        triggerWebhook("waClient", sessionId, "sendMedia", send)
    })
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
    })
})


module.exports = { app, server }
