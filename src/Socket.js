const express = require('express')
const http = require('http')
const app = express()
const path = require('path')
const { Server } = require('socket.io')

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
// Sajikan folder 'docs' sebagai static files
app.use('/docs', express.static(path.join(__dirname, '../docs')))

module.exports = {app,io,server}