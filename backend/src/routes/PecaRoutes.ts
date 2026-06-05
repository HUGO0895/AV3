import { Router } from "express";
import PecaController from "../controller/PecaController";
import { autenticar, autorizar } from "../middleware/auth.middleware";
import { Permissao } from "../../prisma/generated/prisma/enums";

const router= Router()

router.get('/peca/:id', autenticar, PecaController.get)
router.post('/peca', autenticar, autorizar(Permissao.ADMINISTRADOR, Permissao.ENGENHEIRO), PecaController.create)
router.put('/peca', autenticar, autorizar(Permissao.ADMINISTRADOR, Permissao.ENGENHEIRO), PecaController.update)
router.delete('/peca/:id/:nome', autenticar, autorizar(Permissao.ADMINISTRADOR), PecaController.delete)

export default router