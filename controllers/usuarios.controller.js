import { usuariosModel } from "../models/usuarios.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';  // Asegúrate de tener bcrypt instalado

const crearUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar entrada
        if (!email || !password) {
            return res.status(400).json({ ok: false, msg: "Email y contraseña son requeridos." });
        }

        // Buscar usuario por email
        const usuario = await usuariosModel.findOne({ email });
        
        if (!usuario) {
            return res.status(400).json({ ok: false, msg: "El email no está registrado!" });
        }

        // Comparar contraseñas utilizando bcrypt
        const isMatch = await bcrypt.compare(password, usuario.password);
        
        if (!isMatch) {
            return res.status(401).json({ ok: false, msg: "Contraseña inválida!" });
        }

        // Generar token JWT
        const token = jwt.sign(
            { email: usuario.email },
            process.env.SECRET_JWT,
            { expiresIn: '2m' }
        );

        // Establecer cookie con token
        res.cookie('token', token, { httpOnly: true });

        return res.json({ token, email: usuario.email });
    } catch (error) {
        console.error(error);
        return res.status(error.code || 500).json({ ok: false, msg: error.msg || "Error interno del servidor" });
    }
}

export const usuariosController = {
    crearUsuario,
};