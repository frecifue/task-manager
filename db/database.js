const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'tasks.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

// Crear tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT,
      status TEXT DEFAULT 'pendiente',
      fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      fechaActualizacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
