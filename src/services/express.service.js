import express from "express";
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";
import globalErrorHandler from "../middlewares/errorHandler.middleware";

const corsOptions = {
  origin: "http://localhost:3000", // The address of your Next.js app
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

const routeFiles = fs
  .readdirSync(__dirname + "/../routes/")
  .filter((file) => file.endsWith(".js"));

let server;
let routes = [];

const expressService = {
  init: async () => {
    try {
      /*
        Loading routes automatically
      */
      for (const file of routeFiles) {
        const route = await import(`../routes/${file}`);
        const routeName = Object.keys(route)[0];
        routes.push(route[routeName]);
      }

      server = express();
      server.use(bodyParser.json());
      server.use(cors(corsOptions));

      server.use(routes);
      server.use(globalErrorHandler);
      server.listen(process.env.SERVER_PORT);
      console.log("[EXPRESS] Express initialized");
    } catch (error) {
      console.log("[EXPRESS] Error during express service initialization");
      throw error;
    }
  },
};

export default expressService;
