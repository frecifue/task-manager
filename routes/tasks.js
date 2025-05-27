const express = require('express');
const router = express.Router();
const TaskModel = require('../models/taskModel');

// GET /tasks ? Obtener todas las tareas
router.get('/', (req, res) => {
  TaskModel.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /tasks ? Crear nueva tarea
router.post('/', (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo || titulo.length > 100) {
    return res.status(400).json({ error: 'Título es obligatorio y debe tener máximo 100 caracteres.' });
  }

  TaskModel.create({ titulo, descripcion }, (err, task) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Emitir evento WebSocket
    req.io.emit('newTask', task);
    
    res.status(201).json(task);
  });
});

// PUT /tasks/:id ? Actualizar estado de una tarea
router.put('/:id', (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  if (isNaN(id)) return res.status(400).json({ error: 'El id debe ser numerico.' });
  if (!status) return res.status(400).json({ error: 'El estado es obligatorio.' });

  if (!['pendiente', 'completada'].includes(status)) {
    return res.status(400).json({ error: 'Estado inválido. Solo se permite "pendiente" o "completada".' });
  }

  // revisamos si la tarea existe
  TaskModel.getOne(id, (err, task) => {

    if (err) return res.status(500).json({ error: err.message });
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada.' });

    TaskModel.updateStatus(id, status, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        req.io.emit('taskUpdated', result);
        res.json(result);
    });
  });

  
});

// DELETE /tasks/:id ? Eliminar tarea
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) return res.status(400).json({ error: 'El id debe ser numerico.' });

  // revisamos si la tarea existe
  TaskModel.getOne(id, (err, task) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada.' });

    TaskModel.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });

        req.io.emit('taskDeleted', { id: parseInt(id) });
        res.status(204).send();
    });
  });

  
});

module.exports = router;
