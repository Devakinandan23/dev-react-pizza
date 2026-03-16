import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pizzaId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      unitPrice: { type: DataTypes.FLOAT, allowNull: false },
      totalPrice: { type: DataTypes.FLOAT, allowNull: false },
      orderId: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: "order_items" }
  );
};
