import { Router } from "express"
import Aeroroutes from './src/routes/AeroRoutes'
import PecaRoutes from './src/routes/PecaRoutes'
import EtapasRoutes from './src/routes/EtapasRoutes'
import TestesRoutes from './src/routes/TesteRoutes'
import FuncRoutes from './src/routes/FuncRoutes'

const router=Router()

router.use(PecaRoutes)
router.use(EtapasRoutes)
router.use(Aeroroutes)
router.use(TestesRoutes)
router.use(FuncRoutes)

export default router

