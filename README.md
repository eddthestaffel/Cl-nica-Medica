# Clínica Médica - Backend y Frontend

## Descripción

Sistema web para la gestión de una clínica médica desarrollado con Node.js, Express, Sequelize, MySQL y Vue.js.
La aplicación permite administrar pacientes, turnos médicos, historial de consultas y autenticación mediante JWT.

---

## Tecnologías utilizadas

### Backend

* Node.js
* Express
* Sequelize
* MySQL
* JWT (JSON Web Token)
* bcrypt

### Frontend

* Vue 3
* Vue Router
* Axios
* Vite

---

## Instalación

### Clonar repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

### Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=clinica_medica
DB_USER=root
DB_PASSWORD=tu_password

JWT_ACCESS_SECRET=clinica_access_secret_2026
JWT_REFRESH_SECRET=clinica_refresh_secret_2026

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

Ejecutar migraciones:

```bash
npx sequelize-cli db:migrate
```

Iniciar backend:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponible en:

```txt
http://localhost:5173
```

Backend disponible en:

```txt
http://localhost:3000
```

---

## Funcionalidades implementadas

### Autenticación

* Registro de usuarios
* Inicio de sesión
* JWT Access Token
* Refresh Token
* Cierre de sesión

### Gestión de pacientes

* Crear pacientes
* Editar pacientes
* Eliminar pacientes
* Listar pacientes

### Gestión de turnos

* Crear turnos médicos
* Modificar turnos
* Eliminar turnos
* Visualización de agenda

### Historial clínico (RQ-10)

* Consulta del historial de turnos de cada paciente
* Visualización desde la interfaz web

### Recuperación de contraseña (GEN-07)

* Solicitud de recuperación por correo electrónico
* Generación de token temporal
* Expiración de token
* Restablecimiento de contraseña
* Contraseña almacenada mediante hash bcrypt

### Evolución de esquema (GEN-12)

Se implementó una migración que agrega el campo:

```txt
direccion
```

a la entidad Paciente.

Motivación:
Permitir registrar información de contacto adicional para cada paciente.

---

## Estructura general

```txt
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   └── validators/

frontend/
├── src/
│   ├── views/
│   ├── router/
│   ├── services/
│   └── assets/
```

---

## Estado del proyecto

Proyecto funcional en entorno local utilizando MySQL.