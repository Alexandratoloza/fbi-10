import jwt from 'jsonwebtoken'


export const TokenJWT = (req, res, next) => {
    try {
      const token = req.cookies.token;
  
      if (!token) {
        throw { ok: false, msg: "No autorizado!" };
      }
  
      const payload = jwt.verify(token, process.env.SECRET_JWT);
  
      req.email = payload.email;
  
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        ok: false,
        msg: "No autorizado",
      });
    }
  };