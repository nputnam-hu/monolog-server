"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Drafts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      initialMarkdownString: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      processedMarkdownString: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      generatedRecommendedPrompts: {
        type: Sequelize.JSONB,
      },
      noteId: {
        type: Sequelize.UUID,
        references: {
          model: "Notes", // name of the target model
          key: "id", // key in the target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("Drafts"),
};
