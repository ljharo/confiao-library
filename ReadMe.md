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

- Documentación: OpenAPI/Swagger (pendiente)

## Requisitos del Sistema

- Node.js v20+

- PostgreSQL v15+

- npm v8+

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
├── qa/ # Archivos para probar las apis en postman
│ └── confiao-library-env.postman_environment.json
│ └── confiao-library.postman_environment.json
├── src/
│ ├── config/ # Configuraciones
│ ├── controllers/ # Controladores
│ ├── errors/ # Errores personalizados
│ ├── middlewares/ # Middlewares
│ ├── routes/ # Rutas
│ ├── services/ # Lógica de negocio
│ ├── utils/ # Utilidades
│ ├── app.ts # Configuración de Express
│ └── server.ts # Inicio del servidor
├── .env.example # Ejemplo de variables de entorno
└── package.json
```

## Endpoints Principales

## Autenticación

- POST /api/auth/register - Registrar nuevo usuario

- POST /api/auth/login - Iniciar sesión

- POST /api/auth/logout - Cerrar sesión

## Biblioteca Personal

- POST /api/my-library/books - Añadir libro

- GET /api/my-library/books - Obtener todos los libros

- GET /api/my-library/books/:id - Obtener libro específico

- PUT /api/my-library/books/:id - Actualizar notas del libro

- DELETE /api/my-library/books/:id - Eliminar libro

## Planes de Cuotas

- POST /api/my-library/books/:id/installments - Crear plan de cuotas

- GET /api/my-library/books/:id/installments - Obtener plan de cuotas

## Autores

- POST /api/my-library/authors - Añadir autor

- GET /api/my-library/authors - Obtener todos los autores

- GET /api/my-library/authors/:id - Obtener autor específico

## Variables de Entorno

Variable Descripción Ejemplo

- PORT Puerto del servidor 3000
- DATABASE_URL URL de conexión a PostgreSQL postgresql://user:password@localhost:5432/confiao-library
- JWT_SECRET Secreto para JWT tu_super_secreto
- JWT_EXPIRES_IN Tiempo de expiración del token 1h

## Scripts Disponibles

Comando Descripción

- npm run dev Inicia el servidor en desarrollo
- npm run build Compila el proyecto TypeScript
- npm start Inicia el servidor en producción
- npm test Ejecuta tests (pendiente)
- npx prisma migrate dev Ejecuta migraciones de la base de datos
- npx prisma studio Abre interfaz visual de la base de datos

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
