const { sequelize } = require("../db");

const SavedNews = sequelize.define(
  "savednews",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "savedNews",
  }
);

module.exports = SavedNews;
