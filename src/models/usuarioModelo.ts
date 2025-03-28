import pool from '../config/connection';


class UsuarioModelo {
    findUserByUsername(username: any) {
      throw new Error("Method not implemented.");
    }


    public async list() {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " SELECT u.email, u.password, u.role "
                + " FROM tbl_usuario u ")  });
        return result;
    }


    public async add(usuario: any) {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " INSERT INTO tbl_usuario SET ? ", [usuario]);
        });
        return result;
    }
   

    //Metodo Update y delete de validacion
    public async usuarioExiste(email: string): Promise<boolean> {
        const query = "SELECT COUNT(*) as count FROM tbl_usuario WHERE email = ?";
        const result = await pool.then(async (connection) => {
            const [rows]: any = await connection.query(query, [email]);
            return rows[0].count > 0;
        });
        return result;
    }
    
    public async update(usuario: any) {
        if (!(await this.usuarioExiste(usuario.email))) {
            throw new Error("El usuario no existe.");
        }
    
        const update = "UPDATE tbl_usuario SET password=? WHERE email=?";
        console.log("Update: " + update);
    
        const result = await pool.then(async (connection) => {
            return await connection.query(update, [usuario.password, usuario.email]);
        });
        return result;
    }
    
    public async delete(email: string) {
        if (!(await this.usuarioExiste(email))) {
            throw new Error("El usuario no existe.");
        }
    
        console.log("Eliminando usuario con email:", email);
        const result = await pool.then(async (connection) => {
            return await connection.query("DELETE FROM tbl_usuario WHERE email = ?", [email]);
        });
        return result;
    }

}
const model = new UsuarioModelo();
export default model;