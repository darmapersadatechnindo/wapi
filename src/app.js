const {app,io,server} = require("./Socket")
const bodyParser = require('body-parser')


const { restoreSessions } = require('./sessions')
const { routes } = require('./routes')
const { registerHandlers } = require('./Handler/socketHandlers') // Sesuaikan path jika perlu



// Konfigurasi middleware
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: '50mb' })) // Sesuaikan limit sesuai kebutuhan
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

// Gunakan route utama
app.use('/', routes)



// Konfigurasi Socket.IO


io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)
    registerHandlers(socket) // Daftarkan semua handler socket

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
    })
})

// Pulihkan sesi yang ada
restoreSessions()

module.exports = { app, server }
