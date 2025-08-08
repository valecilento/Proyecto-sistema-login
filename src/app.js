import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import passwordRoutes from './routes/password.routes.js';
import sessionRoutes from './routes/sessions.routes.js';
import userRoutes from './routes/users.routes.js';
import cartRoutes from './routes/cart.routes.js';
import './config/db.js';
import './config/passport.config.js';
import adminRoutes from './routes/admin.routes.js';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import authenticateJWT from './middlewares/authenticateJWT.js';

dotenv.config();

const app = express();

// Para resolver __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Handlebars
const hbs = handlebars.create({
  helpers: {
    eq: (a, b) => a === b
  }
});
// Configuración de Handlebars

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..','public')));
app.use(passport.initialize());
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.role = req.user?.role || null;
  next();
});

// Rutas API
app.use('/api/sessions', sessionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/cart', cartRoutes);
app.use('/admin', adminRoutes);


// Ruta de vista principal
app.get('/', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register', { title: 'Registro' });
});

app.get('/login', authenticateJWT, (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/cart', authenticateJWT, (req, res) => {
  res.render('cart', { title: 'Mi carrito' });
});

app.get('/profile', authenticateJWT, (req, res) => {
  res.render('profile', { title: 'Perfil' });
});


app.get('/forgotPassword', (req, res) => {
  res.render('forgotPassword', { title: 'Recuperar contraseña' });
});
app.get('/resetPassword', (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).send('Token requerido');
  }
  res.render('resetPassword', { title: 'Restablecer contraseña', token });
});

// Puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});