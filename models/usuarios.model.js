import { pool } from '../data/connection.js';

const find = async(email) => {
    const query = {
        text: ` SELECT * FROM usuarios
                WHERE EMAIL = $1`,
        values: [email]
    }
    const { rows } = await pool.query(query);
    return rows[0]; 
}

const create = async({ email, password, Usuario}) => {
    const query = {
        text: ` INSERT INTO usuarios (EMAIL, PASSWORD)
                VALUES: ($1, $2, $3)
                RETURNING *;`,
        values: [email, password, Usuario]
    }
    const { rows } = await pool.query(query);
    return rows[0];
}

export const usuariosModel = {
    find,
    create
}