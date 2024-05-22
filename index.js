import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import usuariosRouter from './routes/usuarios.route.js';
import { TokenJWT } from './middlewares/jwt.middleware.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/v1/usuarios', usuariosRouter);

app.get('/agentes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta protegida por JWT
app.get('/restricted-url', TokenJWT, (req, res) => {
    res.json({ ok: true, msg: "Acceso permitido a la ruta restringida" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});
