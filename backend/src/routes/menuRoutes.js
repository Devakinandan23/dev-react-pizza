import { Router } from "express";
import { MenuItem } from "../models/index.js";

const router = Router();

// GET /api/menu — return all menu items
router.get("/menu", async (_req, res, next) => {
  try {
    const menuItems = await MenuItem.findAll({ order: [["id", "ASC"]] });

    res.json({
      status: "success",
      data: menuItems,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
