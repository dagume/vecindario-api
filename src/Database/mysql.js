import Sequelize from 'sequelize';
import { config } from 'dotenv';
config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DIALECT = process.env.DB_DIALECT;

export const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: DB_DIALECT,
        port:DB_PORT,
        pool: {
            max:5,
            min:0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)
