import { Request, Response } from "express";
import validator from "validator";
import model from '../models/authModelo';
import jwt from 'jsonwebtoken';
//import db from '../utils/database';
import {utils} from '../utils/utils';



class AuthController {

 /**
    * Método para valida Inicio de sesión
    * @param req Petición
    * @param res respuesta
    * @returns
    */
 public async iniciarSesion(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // verificar que los datos no esten vacios
        if (validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
            return res.status(400).json({ message: "Los campos son requeridos", code: 1 });
        }

        // Verificar si el usuario existe
        const lstUsers = await model.getuserByEmail(email);
        if (lstUsers.length <= 0) {
            return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
        }

        return res.json({ message: "Autenticación correcta", code: 0 });
    } catch (error: any) {
        return res.status(500).json({ message: `${error.message}` });
    }
}

 public async saludar(req: Request, res: Response) {
    const nombre = req.query.nombre as string || "Invitado";
    const email = req.query.correo as string || "Sin correo";
    const edad = req.query.edad ? Number(req.query.edad) : null; // Convierte edad a número si está presente

    return res.json({
        nombre,
        email,
        edad
    })
 }

}
export const authController = new AuthController();