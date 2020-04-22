const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const port = process.env.port || 5000
const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

io.on('connection', (socket) => {
    console.log('new connection established')
    
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        if (error) return callback(error)
        
        socket.emit('message', { user: 'admin', text: `Hey ${user.name}, welcome to ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` })
        socket.join(user.room)
io.to(user.room).emit('roomNames', {room: user.room, users: getUsersInRoom(user.room)})
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, text: message })

        callback()
    })

    socket.on('disconnect', () => {
        console.log(`User has left`)
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', {user:'admin', text:`${user.name} has left`})
        }
        
    })
})

app.use(router)
server.listen(port, () => console.log(`Server is listening on ${port}`))