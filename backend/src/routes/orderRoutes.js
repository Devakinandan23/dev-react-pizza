import { Router } from "express";
import { Order, OrderItem } from "../models/index.js";

const router = Router();

// GET /api/order/:id — get a single order with cart items
router.get("/order/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: "cart" }],
    });

    if (!order) {
      const err = new Error(`Couldn't find order #${req.params.id}`);
      err.statusCode = 404;
      throw err;
    }

    res.json({
      status: "success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/order — create a new order with cart items
router.post("/order", async (req, res, next) => {
  try {
    const { customer, phone, address, priority, cart, position } = req.body;

    // Calculate prices
    const orderPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const priorityPrice = priority ? orderPrice * 0.2 : 0;

    // Estimated delivery: 30 minutes from now
    const estimatedDelivery = new Date(Date.now() + 30 * 60 * 1000);

    const order = await Order.create({
      customer,
      phone,
      address,
      priority,
      position: position || "",
      estimatedDelivery,
      orderPrice,
      priorityPrice,
    });

    await OrderItem.bulkCreate(
      cart.map((item) => ({
        pizzaId: item.pizzaId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        orderId: order.id,
      }))
    );

    const fullOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: "cart" }],
    });

    res.status(201).json({
      status: "success",
      data: fullOrder,
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/order/:id — update order fields (e.g. priority)
router.patch("/order/:id", async (req, res, next) => {
  try {
    const existing = await Order.findByPk(req.params.id);

    if (!existing) {
      const err = new Error(`Couldn't find order #${req.params.id}`);
      err.statusCode = 404;
      throw err;
    }

    // If toggling priority, recalculate priorityPrice
    const updateData = { ...req.body };
    if (updateData.priority !== undefined) {
      updateData.priorityPrice = updateData.priority
        ? existing.orderPrice * 0.2
        : 0;
    }

    await existing.update(updateData);

    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: "cart" }],
    });

    res.json({
      status: "success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
