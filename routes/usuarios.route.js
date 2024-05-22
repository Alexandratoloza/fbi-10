import express from 'express';
import { usuariosController } from '../controllers/usuarios.controller.js';

const router = express.Router();

router.post('/SignIn', usuariosController.crearUsuario);

export default router;
