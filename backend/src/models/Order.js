import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      customer: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      priority: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      estimatedDelivery: { type: DataTypes.DATE, allowNull: false },
      orderPrice: { type: DataTypes.FLOAT, allowNull: false },
      priorityPrice: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "preparing" },
      position: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    },
    { tableName: "orders" }
  );
};
