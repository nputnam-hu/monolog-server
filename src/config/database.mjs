import "dotenv/config";

export default {
  development: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
      timestamps: true,
    },
  },
  production: {
    dialect: "postgres",
    databaseURL: process.env.DATABASE_URL,
    host: "127.0.0.1",
  },
};
