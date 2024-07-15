const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socket = require('socket.io');
const server = http.createServer(app);
const io = socket(server);

// ejs setup
app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io connection
io.on('connection', function(socket) {
   socket.on("send-location", function(data){
    io.emit("receive-location",{id:socket.id, ...data});
   })
   socket.on("disconnect",function(){
    io.emit("user-disconnect",socket.id)
   })
});

// Route to render index.ejs
app.get('/', function(req, res) {
    res.render('index');
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
