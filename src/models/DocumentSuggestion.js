import Sequelize, { Model } from "sequelize";

class DocumentSuggestion extends Model {
  static init(sequelize) {
    super.init(
      {
        modelResponseRaw: Sequelize.TEXT,
        suggestionHeader: Sequelize.TEXT,
        suggestionDescription: Sequelize.TEXT,
        documentDiffRaw: Sequelize.TEXT,
        documentDiffStructured: Sequelize.JSONB,
        status: {
          type: Sequelize.ENUM,
          values: ["pending", "accepted", "rejected"],
          defaultValue: "pending",
        },
        statusUpdatedAt: {
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
      },
      {
        sequelize,
        timestamps: true,
        //paranoid: true, //If it's true, it does not allow deleting from the bank, but inserts column deletedAt. Timestamps need be true.
        //underscored: true, //If it's true, does not add camelcase for automatically generated attributes, so if we define updatedAt it will be created as updated_at.
        //freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: "DocumentSuggestions", //Define table name
      }
    );

    return this;
  }

  static associate(models) {
    DocumentSuggestion.belongsTo(models.DocumentPrompt, {
      foreignKey: "documentPromptId",
      as: "documentPrompt",
    });
  }
}

export default DocumentSuggestion;
