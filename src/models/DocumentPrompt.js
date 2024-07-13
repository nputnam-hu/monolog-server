import Sequelize, { Model } from "sequelize";

class DocumentPrompt extends Model {
  static init(sequelize) {
    super.init(
      {
        promptString: Sequelize.TEXT,
      },
      {
        sequelize,
        timestamps: true,
        //paranoid: true, //If it's true, it does not allow deleting from the bank, but inserts column deletedAt. Timestamps need be true.
        //underscored: true, //If it's true, does not add camelcase for automatically generated attributes, so if we define updatedAt it will be created as updated_at.
        //freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: "DocumentPrompts", //Define table name
      }
    );

    return this;
  }

  static associate(models) {
    DocumentPrompt.belongsTo(models.Draft, {
      foreignKey: "draftId",
      as: "draft",
    });

    DocumentPrompt.hasMany(models.DocumentSuggestion, {
      foreignKey: "documentPromptId",
      as: "documentSuggestions",
    });
  }
}

export default DocumentPrompt;
