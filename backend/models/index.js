import { Sequelize, DataTypes } from 'sequelize';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


// construct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// path configuration
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        operatorsAliases: false,
        dialectOptions: {
            socketPath: '/tmp/mysql.sock'
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.sequelize.sync({ force: false }).then(() => {
    console.log('yes re-sync done!');
});



export default db;
