import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import defineMenuItem from "./MenuItem.js";
import defineOrder from "./Order.js";
import defineOrderItem from "./OrderItem.js";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
  }
);

export const MenuItem = defineMenuItem(sequelize);
export const Order = defineOrder(sequelize);
export const OrderItem = defineOrderItem(sequelize);

// Associations
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "cart", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });
