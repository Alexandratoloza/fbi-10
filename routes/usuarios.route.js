import { Router } from 'express';
import { usuariosController } from '../controllers/usuarios.controller.js';

const router = Router();

router.post('/', usuariosController.crearUsuario);

export default router;