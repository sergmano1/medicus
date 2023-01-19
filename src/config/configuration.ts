import { config } from 'dotenv';
config();

export default {
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'pg',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
  },
  urls: {
    patient: 'http://localhost:3002',
    Doctor: 'http://localhost:3001',
  },
};
