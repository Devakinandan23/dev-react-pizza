import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "MenuItem",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      unitPrice: { type: DataTypes.FLOAT, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
      ingredients: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
      soldOut: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { tableName: "menu_items" }
  );
};
