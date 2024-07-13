import Sequelize, { Model } from "sequelize";

class Draft extends Model {
  static init(sequelize) {
    super.init(
      {
        initialMarkdownString: Sequelize.TEXT,
        processedMarkdownString: Sequelize.TEXT,
        generatedRecommendedPrompts: Sequelize.JSONB,
      },
      {
        sequelize,
        timestamps: true,
        //paranoid: true, //If it's true, it does not allow deleting from the bank, but inserts column deletedAt. Timestamps need be true.
        //underscored: true, //If it's true, does not add camelcase for automatically generated attributes, so if we define updatedAt it will be created as updated_at.
        //freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: "Drafts", //Define table name
      }
    );

    return this;
  }

  static associate(models) {
    Draft.belongsTo(models.Note, {
      foreignKey: "noteId",
      as: "note",
    });

    Draft.hasMany(models.DocumentPrompt, {
      foreignKey: "draftId",
      as: "documentPrompts",
    });
  }
}

export default Draft;
