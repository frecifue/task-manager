# API de Gestión de Tareas en Tiempo Real

Esta es una API desarrollada en Node.js + Express que permite gestionar una lista de tareas ("To-Do List") en tiempo real utilizando WebSockets (Socket.IO).

## Tecnologías Utilizadas
- Node.js
- Express
- WebSockets (Socket.IO)
- SQLite

## Características

- CRUD completo de tareas.
- Eventos en tiempo real para:
  - Nueva tarea (`newTask`)
  - Actualización de estado (`taskUpdated`)
  - Eliminación de tarea (`taskDeleted`)
- Frontend básico (HTML + JavaScript) que muestra los eventos en vivo.

---

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/frecifue/task-manager.git
cd task-manager
```

## Instalación de Dependencias

```bash
npm install
```


## Ejecución

```bash
npm run dev
```

## Ejecución

- dirigete a exports/
- encontrarás un exportable con todos los endpoints operativos disponibles para insomnia


## Probar WebSockets

- abre tu navegador en

```bash
http://localhost:3000
```

- Verás una lista que se actualiza dinámicamente con los eventos del sistema.


## Desiciones de diseño

- Se utiliza una estructura simple que contiene 
    - db/
        - contiene la conexion a la base de datos SQLite con la creación inmediata de la tabla task
    - models/
        - Contiene las consultas SQL a ejecutar necesarias para el CRUD de tareas
    - routes/
        - Contiene las rutas Express de /task, necesarias para utilizar los endpoints
    - public/
        - Contiene HTML básico con javascript para comprobar la implementación de los sockets
