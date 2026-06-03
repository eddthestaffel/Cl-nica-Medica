# Clínica Médica - Backend

Pagina de Clinica Medica desarrollada con Node.js, Express, Squelize y MySQL, todo para la gestión de pacientes, turnos médicos y la autenticación de usuarios mediante JWT.

## Tecnologías utilizadas

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* JWT (JSON Web Token)
* bcrypt
* express-validator
* dotenv
* nodemon

---

## Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/eddthestaffel/clinica-Medica.git
cd clinica-medica/backend
```

### 2. Instalar dependencias

```bash
npm install
```

* Revisar package.json para ver todas las dependencias

### 3. Configurar variables de entorno

Crear archivo `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=clinica_medica
DB_USER=root
DB_PASSWORD=tu_password

JWT_ACCESS_SECRET=access_secret
JWT_REFRESH_SECRET=refresh_secret

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## Base de Datos

Crear la base de datos:

```sql
CREATE DATABASE clinica_medica;
```

### Ejecutar migraciones

```bash
npx sequelize-cli db:migrate
```

---

## Iniciar servidor

Modo normal:

```bash
npm start
```

Modo desarrollo:

```bash
npm run dev
```

Si todo funciona correctamente aparecerá:

```text
Conectado a MySQL
backend en http://localhost:3000
```

---

## Estructura del proyecto

```text
src/
├── config/
├── controllers/
├── middlewares/
├── migrations/
├── models/
├── routes/
├── seeders/
├── services/
├── utils/
├── validators/
├── app.js
└── server.js
```

---

## API REST

### Autenticación

#### Registrar usuario

POST `/auth/register`

```json
{
  "email": "admin@test.com",
  "password": "123456",
  "nombre": "Administrador"
}
```

#### Iniciar sesión

POST `/auth/login`

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

#### Obtener usuario autenticado

GET `/auth/me`

Header:

```text
Authorization: Bearer TOKEN
```

---

## Pacientes

### Listar pacientes

GET `/pacientes`

### Obtener paciente por ID

GET `/pacientes/:id`

### Crear paciente

POST `/pacientes`

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "rut": "12345678-9",
  "fechaNacimiento": "1990-01-15",
  "telefono": "912345678",
  "email": "juan@email.com"
}
```

### Actualizar paciente

PUT `/pacientes/:id`

### Eliminar paciente

DELETE `/pacientes/:id`

---

## Turnos Médicos

### Listar turnos

GET `/turnos`

### Obtener turno por ID

GET `/turnos/:id`

### Crear turno

POST `/turnos`

```json
{
  "pacienteId": 1,
  "medico": "Dr. González",
  "fecha": "2026-06-15",
  "horaInicio": "09:00",
  "horaFin": "10:00",
  "motivo": "Control General"
}
```

### Actualizar turno

PUT `/turnos/:id`

### Cambiar estado

PATCH `/turnos/:id/estado`

```json
{
  "estado": "atendido"
}
```

Estados válidos:

* programado
* atendido
* cancelado

### Eliminar turno

DELETE `/turnos/:id`

### Agenda diaria

GET `/turnos/agenda?fecha=2026-06-15`

---

## Seguridad

* La autenticación es mediante JWT.
* Los refresh de Tokens se van almacenados en base de datos.
* Validación de datos mediante express-validator.
* Middleware es el control de errores.

---

## Pruebas

Todos los testeos de endpoints fueron realizadas en el increíble Postman.