import * as Yup from "yup";
import User from "../models/User.mjs";
import {
  BadRequestError,
  UnauthorizedError,
  ValidationError,
} from "../utils/ApiError.mjs";

//Yup is a JavaScript schema builder for value parsing and validation.

let userController = {
  add: async (req, res, next) => {
    try {
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const users = await User.findAll();

      return res.status(200).mjson(users);
    } catch (error) {
      next(error);
    }
  },

  find: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) throw new BadRequestError();

      return res.status(200).mjson(user);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) throw new BadRequestError();

      user.destroy();

      return res.status(200).mjson({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
