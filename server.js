const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');
const server = app.listen(8000, () => {
    console.log('Server is running on Port:', 8000);
});
const io = socket(server);

const messages = [];
let users = [];

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);

    socket.on('login', (userName) => {
        const user = { name: userName, id: socket.id };
        users.push(user);
        io.emit('userLoggedIn', users);
        socket.broadcast.emit('userJoined', userName);
    });

    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        const disconnectedUser = users.find(user => user.id === socket.id);
        if (disconnectedUser) {
            users = users.filter(user => user.id !== socket.id);
            io.emit('userLoggedOut', disconnectedUser.name);
            socket.broadcast.emit('userLeft', disconnectedUser.name);
            console.log('Oh, socket ' + socket.id + ' has left');
        }
    });
    console.log('I\'ve added listeners for message, disconnect, and login events\n');
});
