import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.mjs";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();

const modelFiles = fs
  .readdirSync(__dirname + "/src/models/")
  .filter((file) => file.endsWith(".mjs"));

const config = databaseConfig[process.env.NODE_ENV];

console.log(Object.keys(config));

const sequelizeService = {
  init: async () => {
    try {
      let connection = new Sequelize(config);

      /*
        Loading models automatically
      */

      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        model.default.init(connection);
      }

      modelFiles.map(async (file) => {
        const model = await import(`../models/${file}`);
        model.default.associate && model.default.associate(connection.models);
      });

      console.log("[SEQUELIZE] Database service initialized");
    } catch (error) {
      console.log("[SEQUELIZE] Error during database service initialization");
      throw error;
    }
  },
};

export default sequelizeService;
