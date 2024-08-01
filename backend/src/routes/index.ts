import express from "express"
import { UserRouter } from "./user";
import { KeepRouter } from "./keep";

const router = express.Router()

router.use("/user", UserRouter);
router.use("/keep", KeepRouter);

export const Router = router;