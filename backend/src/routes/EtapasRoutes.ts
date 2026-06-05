import { Router } from "express";
import EtapaControler from "../controller/EtapaController";
import { autenticar, autorizar } from "../middleware/auth.middleware";
import { Permissao } from "../../prisma/generated/prisma/enums";

const router=Router()

router.get('/etapas/:id', autenticar, EtapaControler.get)
router.post('/etapas', autenticar, autorizar(Permissao.ADMINISTRADOR, Permissao.ENGENHEIRO), EtapaControler.create)
router.put('/etapas', autenticar, autorizar(Permissao.ADMINISTRADOR, Permissao.ENGENHEIRO), EtapaControler.update)
router.delete('/etapas/:id/:nome', autenticar, autorizar(Permissao.ADMINISTRADOR), EtapaControler.delete)

export default router