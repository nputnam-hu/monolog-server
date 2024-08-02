import dotenv from "dotenv";
import expressService from "./services/express.service.mjs";
import sequelizeService from "./services/sequelize.service.mjs";
import awsService from "./services/aws.service.mjs";
dotenv.config();

const services = [expressService, awsService, sequelizeService];

(async () => {
  try {
    for (const service of services) {
      await service.init();
    }
    console.log("Server initialized.");
    //PUT ADITIONAL CODE HERE.
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
