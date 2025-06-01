**Estimado/a Candidato/a,**

En **Confiao** estamos en la búsqueda de nuevos talentos apasionados por
el desarrollo backend con **Node.js** y **Express.js**. Queremos poner a
prueba tus habilidades técnicas integrando servicios externos, manejando
bases de datos y desarrollando lógicas de negocio escalables en un
entorno real y profesional.

A continuación, te presentamos el **Desafío Backend** que hemos
preparado:

---

### **Desafío: Gestor de Biblioteca con Sistema de Cuotas**

**Objetivo:**
Construir una API RESTful para gestionar una biblioteca personal. La API
debe permitir buscar libros usando la Open Library API, agregar libros a
tu colección local, y gestionar un sistema de cuotas simplificado para
la adquisición de libros.

---

### **Funcionalidades y Endpoints**

#### 1. **Gestión de Libros y Autores**

- **Búsqueda de Libros en Open Library API**
  **Ruta:** `GET /api/books/search/:query`
  **Descripción:**

  - Recibe un término de búsqueda a través del parámetro `query`
    (ejemplo: `/api/books/search/harry potter`).
  - Consulta la Open Library API y devuelve una lista de libros con los
    campos esenciales: título, autor(es), año de publicación y el ID de Open
    Library.

  status: listo

- **Añadir un Libro a la Biblioteca Personal**
  **Ruta:** `POST /api/my-library/books`
  **Ejemplo de Request Body:**

  ```json
  {
    "openLibraryId": "OLID12345",
    "price": 25.5,
    "notes": "Me encantó este libro."
  }
  ```

  **Descripción:**

  - Utiliza el `openLibraryId` para obtener la información del libro
    desde la Open Library API.
  - Guarda en tu base de datos local: ID original, título, autor(es),
    año de publicación, precio y notas (opcional).
  - Valida que el libro no se haya agregado previamente.

  status: listo

- **Obtener Todos los Libros de la Biblioteca Personal**
  **Ruta:** `GET /api/my-library/books`
  **Descripción:**

  - Devuelve una lista completa de todos los libros almacenados en la
    base de datos local.

  status: listo

- **Obtener los Detalles de un Libro**
  **Ruta:** `GET /api/my-library/books/:localId`
  **Descripción:**

  - Recupera el detalle específico de un libro usando su ID local.

  status: listo

- **Actualizar las Notas de un Libro**
  **Ruta:** `PUT /api/my-library/books/:localId`
  **Ejemplo de Request Body:**

  ```json
  {
    "notes": "Lo releeré pronto."
  }
  ```

  **Descripción:**

  - Permite modificar solo las notas de un libro ya añadido. El precio
    no debe ser modificable.

- **Eliminar un Libro**
  **Ruta:** `DELETE /api/my-library/books/:localId`
  **Descripción:**

  - Elimina el libro de la colección local. En este desafío, no se
    requiere verificar la existencia de pagos pendientes, lo que simplifica
    el proceso.

- **Gestión de Autores**
  **Agregar Autor:**
  **Ruta:** `POST /api/my-library/authors`
  **Ejemplo de Request Body:**

  ```json
  {
    "name": "Stephen King",
    "country": "USA"
  }
  ```

  **Obtener Autores:**
  **Ruta:** `GET /api/my-library/authors`

  - También se puede implementar: `GET /api/my-library/authors/:localId`
    para buscar un autor específico.

---

#### 2. **Sistema de Cuotas Simplificado**

- **Iniciar Plan de Cuotas para un Libro**
  **Ruta:** `POST /api/my-library/books/:localId/installments`
  **Ejemplo de Request Body:**

  ```json
  {
    "numberOfInstallments": 3
  }
  ```

  **Descripción:**

  - Para el libro identificado con `localId`, se debe guardar el número
    de cuotas en el mismo registro del libro.
  - Calcula el monto de cada cuota dividiendo el `price` entre el número
    de cuotas (`price / numberOfInstallments`).
  - Asigna a todas las cuotas el estado `"pending"`.
  - _Nota:_ No se implementa la lógica de pagos reales ni se manejan
    múltiples estados complejos.

- **Consultar el Plan de Cuotas de un Libro**
  **Ruta:** `GET /api/my-library/books/:localId/installments`
  **Descripción:**
  - Devuelve el plan de cuotas: número de cuotas y el monto de cada
    cuota.

---

### **Paradigma y Enfoque de Desarrollo**

Para estructurar el código de manera clara, mantenible y escalable,
sugerimos utilizar la **Programación Orientada a Objetos (POO)**,
acompañada de los principios **SOLID**. Esto permitirá:

- **Organización Modular:**
  - **Modelos:** Crear clases para representar las entidades, por
    ejemplo, `Book`, `Author` y `Installment`.
  - **Controladores:** Encapsular la lógica en controladores como
    `BookController` y `InstallmentController`.
  - **Servicios:** Desarrollar servicios especializados (por ejemplo,
    `LibraryService`) para centralizar la lógica de negocio.
- **Facilidad de Extensión:** En el futuro, si deseas ampliar la
  funcionalidad (por ejemplo, añadir pagos reales o estados adicionales),
  tendrás una base de código robusta y organizada para integrar los nuevos
  requerimientos.

---

### **Requisitos Técnicos**

- **Tecnologías:**
  - Backend con **Node.js** y **Express.js**.
  - Uso de `async/await` para el manejo asíncrono, especialmente al
    integrar la Open Library API y la base de datos.
- **Base de Datos:**
  - Puedes elegir entre PostgreSQL, MongoDB, SQLite u otra DB a tu
    conveniencia.
- **Validaciones:**
  - Asegurarte de que el `price` sea un número positivo y que
    `numberOfInstallments` sea un entero válido.
- **Organización del Proyecto:**
  - Separación lógica en rutas, controladores, modelos y servicios.
  - Documentación en un archivo `README.md` que detalle la
    configuración, los endpoints disponibles y las decisiones de diseño.

---

Este desafío está diseñado para que demuestres tus habilidades técnicas
y conocimientos en el desarrollo backend, sin sobrecargar con reglas
excesivamente complejas en el sistema de cuotas. ¡Esperamos ver una
solución profesional y bien estructurada!

Si tienes alguna pregunta o necesitas aclaraciones adicionales, no dudes
en contactarnos. Estamos entusiasmados por conocer tu talento y ver cómo
resuelves este reto.

**ADJUNTO**

TIEMPO DE PRUEBA 72 HORAS Su tiempo comienza el lunes 02 de Junio a las
8 am.

Se adjunta el endpoint para obtener los datos de OPEN LIBRARY
https://openlibrary.org/developers/api

---

**Atentamente,**

**Aaron Escobar**
Lider de desarrollo backend | CONFIAO.C.A
📧 aescobar@confiao.app | 🌐 https://confiao.app/#/
