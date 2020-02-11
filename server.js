const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', socket=>{
    socket.on('disconnect', ()=>{
        io.emit('leave', socket.name);
    })
    socket.on('join',name=>{
        socket.name = name
        io.emit('join', name)
    })
    socket.on('message', user=>{
        io.emit('message', user)
    })
})


http.listen(3000, () => {
    console.log('> http://localhost:3000');
});