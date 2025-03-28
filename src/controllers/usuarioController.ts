import { Request, Response } from "express";
import validator from "validator";
import model from "../models/usuarioModelo";
import { utils } from "../utils/utils";

class UsuarioController {
    public async list(req: Request, res: Response) {
        try {
            const usuarios = await model.list();
            return res.json({
                message: "lista usuario",
                usuarios: usuarios,
                code: 200,
            });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    public async add(req: Request, res: Response) {
        try {
            // Obtener los datos del usuario desde el cuerpo de la solicitud
            const usuario = req.body;

            // Encriptar la contraseña
            var encryptedText = await utils.hashPassword(usuario.password);
            usuario.password = encryptedText;

            // Aquí puedes agregar el código para guardar el usuario en la base de datos
            // Ejemplo: await userModel.save(usuario);

            return res.json({ message: "Agregar Usuario", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            // Obtener los datos del usuario desde el cuerpo de la solicitud
            const usuario = req.body;

            // Encriptar la contraseña si se incluye en la actualización
            if (usuario.password) {
                var encryptedText = await utils.hashPassword(usuario.password);
                usuario.password = encryptedText;
            }

            // Aquí puedes agregar el código para actualizar el usuario en la base de datos
            // Ejemplo: await userModel.update(usuario);

            return res.json({ message: "Modificación de Usuario", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            return res.json({ message: "Eliminación de Usuario", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    public async login(req: Request, res: Response) {
      try {
          const { email, password } = req.body;
          const allUsers = await model.list(); // Obtener todos los usuarios
  
          const foundUser = allUsers.find(user => user.email === email); // Filtrar por correo electrónico
  
          if (!foundUser) {
              return res.status(401).json({ message: "Usuario no encontrado", code: 1 });
          }
  
          let result = await utils.checkPassword(password, foundUser.password);
  
          if (result) {
              return res.json({ message: "Autenticación correcta", code: 0 });
          } else {
              return res.status(401).json({ message: "Password Incorrecto", code: 1 });
          }
      } catch (error: any) {
          return res.status(500).json({ message: `${error.message}` });
      }
  }
}

export const usuarioController = new UsuarioController();