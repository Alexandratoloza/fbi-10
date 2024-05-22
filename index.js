import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import usuariosRouter from './routes/usuarios.route.js';
import {verifyTokenJWT } from './middlewares/jwt.middleware.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/SignIn', usuariosRouter);

app.get('/agente', (req, res)=>{
    res.sendFile(__dirname + '/public/agente.html');
});

app.get('/restricted-url', verifyTokenJWT, (req, res)=>{
    res.sendFile(__dirname + '/public/restricted_page.html');

});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});
