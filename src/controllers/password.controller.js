import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import { createHash } from '../utils/hash.js';
import { JWT_SECRET } from '../config/jwt.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER; 
const EMAIL_PASS = process.env.EMAIL_PASS; 

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

const TOKEN_EXPIRATION = '1h';

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).send({ error: 'Usuario no encontrado' });

        const token = jwt.sign({ id: user._id, email: user.email}, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
        
        // Generación del link de reseteo
        const resetLink = `${req.protocol}://${req.get('host')}/resetPassword?token=${token}`;

        // Envia el link por email con nodemailer
        await transporter.sendMail({
            from: `"Mi App" <${EMAIL_USER}>`,
            to: email,
            subject: 'Restablecer contraseña',
            html: `<p>Hiciste una solicitud para restablecer tu contraseña.</p>
                    <p>Haz click en el siguiente enlace para cambiarla (válido por una hora):</p>
                    <a href="${resetLink}">${resetLink}</a>`
            });

            res.json({ message: 'Si el correo existe, se envió el enlace' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ error: 'Datos incompletos' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await userModel.findById(payload.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Validación para que la nueva contraseña no sea igual a la anterior
    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (isSamePassword) {
      return res.status(400).json({ error: 'La nueva contraseña no puede ser igual a la anterior' });
    }

    // Actualiza la contraseña
    user.password = createHash(password);
    await user.save();

    res.json({ status: 'success', message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ error: 'El enlace expiró. Solicite uno nuevo.' });
    }
    res.status(400).json({ error: 'Token inválido o datos incorrectos' });
  }
};
export const showResetForm = (req, res) => {
  const { token } = req.params;
  if (!token) {
    return res.status(400).send('Token inválido');
  }
  res.render('resetPassword', { token }); 
};