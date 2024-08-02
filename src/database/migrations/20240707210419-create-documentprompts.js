"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("DocumentPrompts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      promptString: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      draftId: {
        type: Sequelize.UUID,
        references: {
          model: "Drafts", // name of the target model
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

  down: (queryInterface) => queryInterface.dropTable("DocumentPrompts"),
};
