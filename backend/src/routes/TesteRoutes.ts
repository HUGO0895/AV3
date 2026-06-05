import { Router } from "express";
import TesteController from "../controller/TesteController";
import { autenticar, autorizar } from "../middleware/auth.middleware";
import { Permissao } from "../../prisma/generated/prisma/enums";

const router=Router()

router.get('/testes/:id', autenticar, TesteController.get)
router.post('/testes', autenticar, autorizar(Permissao.ADMINISTRADOR, Permissao.ENGENHEIRO), TesteController.create)
router.put('/testes', autenticar, autorizar(Permissao.ADMINISTRADOR, Permissao.ENGENHEIRO), TesteController.update)
router.delete('/testes/:id/:nome', autenticar, autorizar(Permissao.ADMINISTRADOR), TesteController.delete)

export default router