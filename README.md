# API de Gesti�n de Tareas en Tiempo Real

Esta es una API desarrollada en Node.js + Express que permite gestionar una lista de tareas ("To-Do List") en tiempo real utilizando WebSockets (Socket.IO).

## Tecnolog�as Utilizadas
- Node.js
- Express
- WebSockets (Socket.IO)
- SQLite

## Caracter�sticas

- CRUD completo de tareas.
- Eventos en tiempo real para:
  - Nueva tarea (`newTask`)
  - Actualizaci�n de estado (`taskUpdated`)
  - Eliminaci�n de tarea (`taskDeleted`)
- Frontend b�sico (HTML + JavaScript) que muestra los eventos en vivo.

---

## Instalaci�n

1. Clona el repositorio:

```bash
git clone https://github.com/frecifue/task-manager.git
cd task-manager
```

## Instalaci�n de Dependencias

```bash
npm install
```


## Ejecuci�n

```bash
npm run dev
```

## Ejecuci�n

- dirigete a exports/
- encontrar�s un exportable con todos los endpoints operativos disponibles para insomnia


## Probar WebSockets

- abre tu navegador en

```bash
http://localhost:3000
```

- Ver�s una lista que se actualiza din�micamente con los eventos del sistema.


## Desiciones de dise�o

- Se utiliza una estructura simple que contiene 
    - db/
        - contiene la conexion a la base de datos SQLite con la creaci�n inmediata de la tabla task
    - models/
        - Contiene las consultas SQL a ejecutar necesarias para el CRUD de tareas
    - routes/
        - Contiene las rutas Express de /task, necesarias para utilizar los endpoints
    - public/
        - Contiene HTML b�sico con javascript para comprobar la implementaci�n de los sockets
