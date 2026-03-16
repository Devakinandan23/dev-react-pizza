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
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "[]",
        get() {
          const val = this.getDataValue("ingredients");
          return val ? JSON.parse(val) : [];
        },
        set(val) {
          this.setDataValue("ingredients", JSON.stringify(val));
        },
      },
      soldOut: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { tableName: "menu_items" }
  );
};
