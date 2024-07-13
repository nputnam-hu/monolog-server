"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Notes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isLiked: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      audioUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.DECIMAL,
      },
      transcript: {
        type: Sequelize.JSONB,
      },
      activeDraftIdx: {
        type: Sequelize.DECIMAL,
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

  down: (queryInterface) => queryInterface.dropTable("Notes"),
};
