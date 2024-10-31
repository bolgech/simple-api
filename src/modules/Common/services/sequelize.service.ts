import {Sequelize} from 'sequelize';

const sequelize = new Sequelize(
    process.env.POSTGRES_DB_NAME||'simple-api',
    process.env.POSTGRES_USERNAME||'postgres',
    process.env.POSTGRES_PASSWORD||'',
    {
        host: process.env.POSTGRES_HOST||'localhost',
        dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    });

let connection;

const destroy_all_tables=false;
export const getSequelize = async () => {
    try {
        if (!connection) {
            await sequelize.authenticate();
          //  await sequelize.sync({force: destroy_all_tables});
            connection = sequelize;
            return connection
        }
    } catch (err) {
        throw err
    }
}
