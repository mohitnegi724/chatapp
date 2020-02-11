const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', socket=>{
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('leave', socket.name);
    })
    socket.on('join',name=>{
        socket.name = name;
        socket.broadcast.emit('join', name);
    })
    socket.on('message', user=>{
        io.emit('message', user)
    })
})


http.listen(3000, () => {
    console.log('> http://localhost:3000');
});