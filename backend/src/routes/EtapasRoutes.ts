import { Router } from "express";
import EtapaControler from "../controller/EtapaController";

const router=Router()

router.get('/etapas/:id',EtapaControler.get)
router.post('/etapas',EtapaControler.create)
router.put('/etapas',EtapaControler.update)
router.delete('/etapas/:id/:nome',EtapaControler.delete)

export default router
