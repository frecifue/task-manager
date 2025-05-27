const db = require('../db/database');

const TaskModel = {

  getOne: (id, callback) => {
    const sql = `SELECT * FROM tasks WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) return callback(err);
        callback(null, row); 
    });
  },

  getAll: (callback) => {
    db.all('SELECT * FROM tasks', [], callback);
  },

  create: ({ titulo, descripcion }, callback) => {
    const sql = `
      INSERT INTO tasks (titulo, descripcion)
      VALUES (?, ?)
    `;
    db.run(sql, [titulo, descripcion], function (err) {
      if (err) return callback(err);
      db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], callback);
    });
  },

  updateStatus: (id, status, callback) => {
    const sql = `
      UPDATE tasks
      SET status = ?, fechaActualizacion = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    db.run(sql, [status, id], function (err) {
      if (err) return callback(err);
      callback(null, { id, status });
      //db.get('SELECT * FROM tasks WHERE id = ?', [id], callback);
    });
  },

  delete: (id, callback) => {
    const sql = `DELETE FROM tasks WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) return callback(err);
      callback(null);
    });
  }
};

module.exports = TaskModel;
