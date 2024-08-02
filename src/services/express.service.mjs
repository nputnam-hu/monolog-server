import express from "express";
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";
import globalErrorHandler from "../middlewares/errorHandler.middleware.mjs";
import path from "path";
import { noteRoutes } from "../routes/note.routes.mjs";
import { draftRoutes } from "../routes/draft.routes.mjs";

const __dirname = path.resolve();
console.log("Resolved __dirname:", __dirname);

const corsOptions = {
  origin: "https://monolog-server-bc1532d12299.herokuapp.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const routeFiles = fs
  .readdirSync(__dirname + "/src/routes")
  .filter((file) => file.endsWith(".mjs"));
console.log("Route files:", routeFiles);

let server;
let routes = [];

const expressService = {
  init: async () => {
    try {
      server = express();
      server.use(bodyParser.json());
      server.use(cors(corsOptions));

      server.use(noteRoutes);
      server.use(draftRoutes);
      // server.use(globalErrorHandler);
      server.listen(process.env.PORT, () => {
        console.log(
          `[EXPRESS] Express initialized on port ${process.env.SERVER_PORT}`
        );
      });
    } catch (error) {
      console.log("[EXPRESS] Error during express service initialization");
      throw error;
    }
  },
};

export default expressService;
