import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

import sessionRoutes from './src/routes/sessions.routes.js';
import userRoutes from './src/routes/users.routes.js';
import './src/config/db.js';
import './src/config/passport.config.js';

dotenv.config();

const app = express();

// Para resolver __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Rutas API
app.use('/api/sessions', sessionRoutes);
app.use('/api/users', userRoutes);

// Ruta de vista principal
app.get('/', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register', { title: 'Registro' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/profile', (req, res) => {
  res.render('profile', { title: 'Perfil' });
});

// Puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});