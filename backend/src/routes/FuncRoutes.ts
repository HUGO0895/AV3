import { Router } from "express";
import FuncController from "../controller/FuncController";
import { autenticar, autorizar } from "../middleware/auth.middleware";
import { Permissao } from "../../prisma/generated/prisma/enums";

const router=Router()

router.post('/login', FuncController.login)
router.get('/funcionarios', autenticar, FuncController.get)
router.post('/funcionarios', autenticar, autorizar(Permissao.ADMINISTRADOR), FuncController.create)
router.delete('/funcionarios/:usuario', autenticar, autorizar(Permissao.ADMINISTRADOR), FuncController.delete)
router.put('/funcionarios', autenticar, autorizar(Permissao.ADMINISTRADOR), FuncController.update)

export default router