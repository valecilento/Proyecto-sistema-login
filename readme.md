# Ecommerce Backend - Gestión de Usuarios con JWT y Passport

Este proyecto implementa un sistema completo de gestión de usuarios (CRUD) con autenticación y autorización en un entorno backend con Express.js. Incluye vistas en Handlebars y diseño responsivo con Bootstrap y CSS personalizado.

---

## Funcionalidades principales

- CRUD de usuarios con los campos:
  - `first_name`, `last_name`, `email`, `age`, `password` (encriptada), `cart` (referencia) y `role`
- Registro y login de usuarios
- Contraseña protegida con `bcrypt`
- Autenticación con `passport-local`
- Autorización mediante tokens JWT (`passport-jwt`)
- Generación y validación de tokens JWT
- Ruta protegida `/api/sessions/current` que devuelve los datos del usuario autenticado
- Vistas en Handlebars para:
  - Registro (`/register`)
  - Login (`/login`)
  - Perfil (`/profile`)
- Diseño moderno y responsive con Bootstrap 5 y estilo pastel en CSS

---

## Cómo ejecutar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ecommerce-backend.git
   cd ecommerce-backend
2. Instalar las dependencias:
    npm install
3. Crear un archivo .env en la raíz del proyecto con el siguiente contenido:
    PORT=8080
    MONGO_URI=mongodb://localhost:27017/ecommerce
    JWT_SECRET=tu_clave_secreta
4. Iniciar el servidor:
    npm start
5. Acceder a la app desde el navegador:
    http://localhost:8080/

 Estructura del proyecto
 backend-2
├── app.js
├── /public
│   └── /js, /css
├── /src
│   ├── /config (passport, db, jwt)
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   ├── /utils
│   └── /views (handlebars)
├── package.json

Autor: Valeria Cilento



