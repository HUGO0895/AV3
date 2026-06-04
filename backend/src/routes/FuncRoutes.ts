import { Router } from "express";
import FuncController from "../controller/FuncController";

const router=Router()

router.get('/funcionarios',FuncController.get)
router.post('/funcionarios',FuncController.create)
router.delete('/funcionarios/:usuario',FuncController.delete)
router.put('/funcionarios',FuncController.update)

export default router