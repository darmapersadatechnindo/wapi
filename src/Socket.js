const express = require('express')
const http = require('http')
const https = require("https");
const app = express()
const path = require('path')
const { Server } = require('socket.io')
const fs = require('fs')
const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/wa.darmasoft.biz.id/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/wa.darmasoft.biz.id/fullchain.pem"),
  };
  

const server = https.createServer(options,app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
// Sajikan folder 'docs' sebagai static files
app.use('/docs', express.static(path.join(__dirname, '../docs')))

module.exports = {app,io,server}