import jwt from 'jsonwebtoken';

export const TokenJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ ok: false, msg: "Acceso denegado. No se proporcionó token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(401).json({ ok: false, msg: "Token inválido o expirado." });
    }
};