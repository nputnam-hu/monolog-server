"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("DocumentSuggestions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      modelResponseRaw: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      suggestionHeader: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      suggestionDescription: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      documentDiffRaw: {
        type: Sequelize.TEXT,
      },
      documentDiffStructured: {
        type: Sequelize.JSONB,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["pending", "accepted", "rejected"],
        defaultValue: "pending",
      },
      statusUpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      documentPromptId: {
        type: Sequelize.INTEGER,
        references: {
          model: "DocumentPrompts", // name of the target model
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

  down: (queryInterface) => queryInterface.dropTable("DocumentSuggestions"),
};
