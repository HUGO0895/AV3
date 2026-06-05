import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { Permissao } from "../../prisma/generated/prisma/enums";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

function autenticar(req:Request, res:Response, next:NextFunction){
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ status:"error", resposta:"Token não fornecido" })

    const token = authHeader.split(" ")[1]
    try{
        const payload = jwt.verify(token, JWT_SECRET) as any
        ;(req as any).user = payload
        next()
    }catch{
        return res.status(401).json({ status:"error", resposta:"Token inválido ou expirado" })
    }
}

function autorizar(...permissoes:Permissao[]){
    return (req:Request, res:Response, next:NextFunction) => {
        const user = (req as any).user
        if(!user || !permissoes.includes(user.nivelPermissao))
            return res.status(403).json({ status:"error", resposta:"Acesso negado" })
        next()
    }
}

export {autenticar,autorizar}