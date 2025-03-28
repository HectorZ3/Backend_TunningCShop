import {Router, RouterOptions} from "express";
import { authController } from "../controllers/authController";

class AuthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        this.router.post('/', authController.iniciarSesion);
        this.router.get('/', authController.saludar); //Metodo Get      
    }
}
const authRoutes = new AuthRoutes();
export default authRoutes.router;