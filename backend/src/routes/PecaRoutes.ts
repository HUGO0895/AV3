import { Router } from "express";
import PecaController from "../controller/PecaController";

const router= Router()

router.post('/peca',PecaController.create)
router.put('/peca',PecaController.update)
router.delete('/peca/:id/:nome',PecaController.delete)
router.get('/peca/:id',PecaController.get)

export default router