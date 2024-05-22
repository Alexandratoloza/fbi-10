import { usuariosModel } from "../models/usuarios.model.js";
import {handleErrorDatabase} from "../database/errors.database.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';  


//api/v1/usuarios/login
const login = async (req, res) => {
    try{
        const {email, password } = req.body
        const usuario = await usuariosModel.findOnebyEmail(email)
        return res.json(usuario)

    } catch (error) {
        console.log(error)
        const {code, msg} = handleErrorDatabase(error)
        return res.status(code).json({ok: false, msg})
    }

    }

const register = async (req, res) => {

    try{

        const {email, password} = req.body

       const newUsuario = await usuariosModel.findOnebyEmail(email)
       if(newUsuario) return res.status(400).json({
        ok: false,
        msg: "usuario ya registrado"
       })

       const salt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(password, salt)


        const usuario = await usuariosModel.create({email, password: hashPassword})
        return res.status(201).json(usuario)


    } catch (error) {
        console.log(error)
        const {code, msg} = handleErrorDatabase(error)
        return res.status(code).json({ok: false, msg})
    }
    
}

export const usuariosController = {
    login,
    register
};
