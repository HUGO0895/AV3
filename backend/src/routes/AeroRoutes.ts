import { Router } from "express";
import AeroController from "../controller/AeroController";
import { autenticar, autorizar } from "../middleware/auth.middleware";
import { Permissao } from "../../prisma/generated/prisma/enums";

const router= Router()

router.get('/aeronaves', autenticar, AeroController.get)
router.post('/aeronaves', autenticar, autorizar(Permissao.ADMINISTRADOR, Permissao.ENGENHEIRO), AeroController.create)
router.put('/aeronaves', autenticar, autorizar(Permissao.ADMINISTRADOR, Permissao.ENGENHEIRO), AeroController.update)
router.delete('/aeronaves/:id', autenticar, autorizar(Permissao.ADMINISTRADOR), AeroController.delete)

export default router