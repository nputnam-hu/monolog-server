"use strict";
const fs = require("fs");
const path = require("path");
const data = require("../data/demo-notes");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Read JSON data from file

    // Insert data into the table
    await queryInterface.bulkInsert("Notes", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Notes", null, {});
  },
};
