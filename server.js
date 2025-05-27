const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Rutas
app.use('/tasks', tasksRouter);

// Conexión de WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
