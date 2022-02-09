
const config = require('config');
import db from '../db';
import User from '../models/user.model';
import DatabaseError from '../models/errors/database.error.models'
class UserRepository {

    async returnAll(): Promise<User[]> {
        const query = 'SELECT uuid, username, email FROM application_users';
        const promisePool = db.promise();
        const [rows] = await promisePool.query(query);
        return rows || [];
    }

    async findById(uuid: string): Promise<User> {
        try {
            const promisePool = db.promise();
            const [row] = await promisePool.query('SELECT uuid, username, email FROM application_users WHERE uuid = ?', [uuid]);
            const [user] = row;
            return user;
        } catch (error) {
            throw new DatabaseError('Erro ao tentar localizar usuário', error);
        }

    }
    async authenticate(email: string, password: string): Promise<User> {
        try {
            const encryptKey = config.get('authentication.passwordEncryptKey');
            const query = 'SELECT uuid, username, email FROM application_users WHERE (email = ? and CAST(AES_DECRYPT(password, ?) AS CHAR) = ?)'
            const promisePool = db.promise();
            const [row] = await promisePool.query(query, [email, encryptKey, password]);
            const [user] = row;
            return user || null;
        } catch (error) {
            throw new DatabaseError('Erro ao tentar localizar usuário', error);
        }

    }

    async create(user: User): Promise<User> {
        try {
            const encryptKey = config.get('authentication.passwordEncryptKey');
            const queryInsert = `INSERT INTO application_users (username, email, password) Values (?, ?, AES_ENCRYPT(?, ?))`;
            const querySelect = 'SELECT uuid, email, username FROM application_users WHERE email = ?';
            const promisePool = db.promise();
            await promisePool.query(queryInsert, [user.username, user.email, user.password, encryptKey]);
            const [row] = await promisePool.query(querySelect, [user.email]);
            const [newUser] = row;
            return newUser;
        } catch (error) {
            throw new DatabaseError('Erro na criação do usuário', error);
        }
    }

    async update(uuid: string, user: User): Promise<void> {
        try {
            const encryptKey = config.get('authentication.encryptKey');
            const query = 'UPDATE application_users SET username = ?, email = ?, password =  AES_ENCRYPT(?, ?) WHERE (uuid = ?)';
            const promisePool = db.promise();
            await promisePool.query(query, [user.username, user.email, user.password, encryptKey, uuid]);
        } catch (error) {
            throw new DatabaseError('Erro na atualização do usuário', error);
        }
    }

    async destroy(uuid: string): Promise<void> {
        try {
            const query = 'DELETE FROM application_users WHERE (uuid = ?)';
            const promisePool = db.promise();
            await promisePool.query(query, [uuid]);
        } catch (error) {
            throw new DatabaseError('Erro ao excluir usuário', error);
        }
    }

}

export default new UserRepository();