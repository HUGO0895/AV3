import { Router } from "express";
import AeroController from "../controller/AeroController";

const router= Router()

router.get('/aeronaves',AeroController.get)
router.post('/aeronaves',AeroController.create)
router.put('/aeronaves',AeroController.update)
router.delete('/aeronaves/:id',AeroController.delete)

export default router