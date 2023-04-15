const express = require('express')
const app = express()
const http = require('http')
const socketio = require('socket.io')

const port = process.env.PORT || 3000
const server = http.createServer(app)

app.use(express.static('./public'))
app.set('view engine' , 'ejs')
app.get('/', (req,res) =>{
    res.render('index')
})

const io = socketio(server)

io.on('connection' , (socket) =>{
    console.log('new user is connected')

    socket.emit('update' , 'welcome to chatt place🖐🏿🖐🏿')
    
    socket.on('newUser', (username)=>{
    socket.broadcast.emit('update', username +' join the chatt room')
    })

    socket.on('UserLeft' , (username)=>{
    socket.broadcast.emit('update', username +' left the chatt room!')
    })

socket.on('chat' ,(message)=>{
socket.broadcast.emit('chat',message)
    })
})

server.listen(port , ()=>{
    console.log(`server is on port ${port}`)
})