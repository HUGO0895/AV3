import { Router } from "express";
import TesteController from "../controller/TesteController";

const router=Router()

router.get('/testes/:id',TesteController.get)
router.post('/testes',TesteController.create)
router.put('/testes',TesteController.update)
router.delete('/testes/:id/:nome',TesteController.delete)

 export default router;