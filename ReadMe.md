# 📚 Confiao Library - API de Gestión de Biblioteca Personal

## Descripción

Confiao Library es una API RESTful desarrollada con Node.js, Express y Prisma que permite a los usuarios gestionar su biblioteca personal de libros, integrando con la Open Library API para obtener metadatos de libros.

## Características Principales

- ✅ Autenticación JWT

- 📖 Gestión de libros personales

- ✍️ Notas y valoraciones personalizadas

- 💳 Sistema de planes de cuotas para libros

- 🧑‍💻 Gestión de autores

- 🔍 Búsqueda en Open Library API

## Tecnologías Utilizadas

- Backend: Node.js, Express

- Base de Datos: PostgreSQL

- ORM: Prisma

- Autenticación: JWT

- Deploy: Docker

## Requisitos del Sistema

- Node.js v20+

- PostgreSQL v15+

- npm v8+

- Docker v20+

## Configuración Inicial

Clonar el repositorio:

```bash
git clone https://github.com/ljharo/confiao-library.git
cd confiao-library
```

Instalar dependencias:

```bash
npm install
```

Configurar variables de entorno:
Editar el archivo .env con tus credenciales.

```bash
cp .env.example .env
```

Ejecutar migraciones de Prisma:

```bash
npx prisma migrate dev
```

Iniciar el servidor:

```bash
npm run dev
```

Estructura del Proyecto

```bash
confiao-library/
├── prisma/
│ └── schema.prisma # Esquema de la base de datos
│
├── qa/ # Archivos para probar las apis en postman
│ └── confiao-library-env.postman_environment.json
│ └── confiao-library.postman_environment.json
│
├── src/
│ ├── config/ # Configuraciones
│ ├── controllers/ # Controladores
│ ├── middlewares/ # Middlewares
│ ├── routes/ # Rutas
│ ├── services/ # Lógica de negocio
│ ├── utils/ # Utilidades
│ ├── app.ts # Configuración de Express
│ └── server.ts # Inicio del servidor
│
├── .env.example # Ejemplo de variables de entorno
├──  package.json
├──  docker-compose.yml
└──  Dockerfile


```

## Endpoints Principales

## Autenticación

- POST /api/auth/register - Registrar nuevo usuario

```bash
POST api/auth/register HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Content-Length: 90

{
  "email": "user55@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

- POST /api/auth/login - Iniciar sesión

```bash
POST api/auth/login HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Content-Length: 65

{
  "email": "user@example.com",
  "password": "password123"
}
```

- POST /api/auth/logout - Cerrar sesión

```bash
POST /api/auth/logout HTTP/1.1
Host: localhost:3001
Authorization: Bearer jwt-token
```

## Open Api library

- GET api/books/search/:query - Buscar libros por título

```bash
GET /api/books/search/dune HTTP/1.1
Host: localhost:3001
Authorization: Bearer jwt-token
```

## Biblioteca Personal

- POST /api/my-library/books - Añadir libro

```bash
POST /api/my-library/books HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Authorization: Bearer jwt-token
Content-Length: 98

{
  "openLibraryId": "OL893415W",
  "price": 55,
  "notes": "el padre de la ciencia ficción"
}
```

- GET /api/my-library/books - Obtener todos los libros

```bash
cGET /api/my-library/books HTTP/1.1
Host: localhost:3001
Authorization: Bearer jwt-token
```

- GET /api/my-library/books/:id - Obtener libro específico

```bash
GET /api/my-library/books/5 HTTP/1.1
Host: localhost:3001
Authorization: Bearer jwt-token
```

- PUT /api/my-library/books/:id - Actualizar notas del libro

```bash
PUT /api/my-library/books/5 HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Authorization: Bearer jwt-token
Content-Length: 46

{
  "notes": "el mejor libro que he leido"
}
```

- DELETE /api/my-library/books/:id - Eliminar libro

```bash
DELETE /api/my-library/books/5 HTTP/1.1
Host: localhost:3001
Authorization: Bearer jwt-token
```

## Planes de Cuotas

- POST /api/my-library/books/:id/installments - Crear plan de cuotas

```bash
POST /api/my-library/books/6/installments HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Authorization: Bearer jwt-token
Content-Length: 33

{
  "numberOfInstallments": 5
}
```

- GET /api/my-library/books/:id/installments - Obtener plan de cuotas

```bash
GET /api/my-library/books/6/installments HTTP/1.1
Host: localhost:3001
Authorization: Bearer jwt-token
```

## Autores

- POST /api/authors - Añadir autor

```bash
POST /api/authors HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Authorization: Bearer jwt-token
Content-Length: 49


{
  "name": "john Dou",
  "country": "ESP"
}
```

- GET /api/authors - Obtener todos los autores

```bash
GET /api/authors HTTP/1.1
Host: localhost:3001
Authorization: Bearer jwt-token
```

- GET /api/authors/:id - Obtener autor específico

```bash
GET /api/authors/2 HTTP/1.1
Host: localhost:3001
Authorization: Bearer jwt-token
```

## Variables de Entorno

Variable Descripción Ejemplo

- PORT Puerto del servidor 3000
- DATABASE_URL URL de conexión a PostgreSQL postgresql://user:password@localhost:5432/confiao-library
- JWT_SECRET Secreto para JWT tu_super_secreto
- JWT_EXPIRES_IN Tiempo de expiración del token 1h

## Scripts Disponibles

Comando Descripción

- npm run dev // Inicia el servidor en desarrollo
- npm run build // Compila el proyecto TypeScript
- npm start Inicia // el servidor en producción
- npm test // Ejecuta tests (pendiente)
- npx prisma // migrate dev Ejecuta migraciones de la base de datos
- npx prisma // studio Abre interfaz visual de la base de datos

## Contribución

Haz fork del proyecto

Crea una rama (git checkout -b feature/nueva-funcionalidad)

Haz commit de tus cambios (git commit -am 'Añade nueva funcionalidad')

Haz push a la rama (git push origin feature/nueva-funcionalidad)

Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

## Contacto

Para preguntas o sugerencias, contacta al equipo de desarrollo en <haroomg@gmail.com>
