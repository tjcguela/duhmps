import express from "express";
import {
  createDuhmp,
  deleteDuhmp,
  getDuhmps,
  updateDuhmp,
} from "../controllers/duhmp.controller.js";

const router = express.Router();

router.get("/", getDuhmps);
router.post("/", createDuhmp);
router.put("/:id", updateDuhmp);
router.delete("/:id", deleteDuhmp);

export default router;
