import{ Router } from 'express';
import { usuariosController } from '../controllers/usuarios.controller.js';

const router = Router()

router.post('/', usuariosController.login);
router.post('/register', usuariosController.register )

export default router;
