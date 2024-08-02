"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("DocumentSuggestions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      modelResponseRaw: {
        type: Sequelize.TEXT,
      },
      suggestionHeader: {
        type: Sequelize.TEXT,
      },
      suggestionDescription: {
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
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      documentPromptId: {
        type: Sequelize.UUID,
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
