import { DataTypes } from "sequelize";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateShortId(length = 6) {
  let id = "";
  for (let i = 0; i < length; i++) {
    id += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return id;
}

export default (sequelize) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.STRING(6),
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

  Order.beforeCreate((order) => {
    order.id = generateShortId();
  });

  return Order;
};
