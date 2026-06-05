import { Request, Response } from "express";
import FuncRepos from "../repository/FuncRepo";
import FuncService from "../service/FuncService";
import { createFuncionario, updateFuncionario } from "../dto/FuncionaroDTO";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export default class FuncController{
    private static FuncRepositorie=new FuncRepos()
    private static ServiceFunc= new FuncService(FuncController.FuncRepositorie)

    static async create(req:Request,res:Response){
        try{
            const func:createFuncionario=req.body
            const resposta=await FuncController.ServiceFunc.create(func)
            return res.status(200).json({
                status:"sucess",
                resposta
            })
                }catch(erro){
                    return res.status(400).json({
                        status:"error",
                        resposta:"Erro ao criar Usuário"
                    })
                }
    }

    static async update(req:Request,res:Response){
         try{
            const func:updateFuncionario=req.body
            const resposta=await FuncController.ServiceFunc.update(func)
              return res.status(200).json({
                status:"sucess",
                resposta
            })
         }catch(erro){
          return res.status(400).json({
                        status:"error",
                        resposta:"Erro ao Atualizar esse Usuário"
                    })
         }
    }
    static async delete(req:Request,res:Response){
      try{
        const {usuario}=req.params
        const resposta=await FuncController.ServiceFunc.delete(usuario as string)
        return res.status(200).json({
            status:"sucess",
            resposta
        })
      }catch(erro){
        return res.status(400).json({
            status:"error",
            resposta:"Não foi possivel deletar esse usuário"
        })
      }
    }

    static async get (req:Request,res:Response){
     try{
        const resposta=await FuncController.ServiceFunc.get()
        return res.status(200).json({
            status:"sucess",
            resposta
        })
     }catch(erro){
        return res.status(400).json({
            status:"error",
            resposta:"Não foi possivel buscar usuários"
        })
     }
    }

    static async login(req:Request,res:Response){
        try{
            const {usuario, senha} = req.body
            const func = await FuncController.ServiceFunc.login(usuario)
            if(!func) return res.status(401).json({ status:"error", resposta:"Usuário não encontrado" })

            const senhaCorreta = await bcrypt.compare(senha, func.senha)
            if(!senhaCorreta) return res.status(401).json({ status:"error", resposta:"Senha incorreta" })

            const token = jwt.sign(
                { id: func.id, usuario: func.usuario, nivelPermissao: func.nivelPermissao },
                JWT_SECRET,
                { expiresIn:"8h" }
            )

            return res.status(200).json({
                status:"sucess",
                resposta:{ token, nivelPermissao: func.nivelPermissao }
            })
        }catch(erro){
            return res.status(400).json({ status:"error", resposta:"Erro ao realizar login" })
        }
    }
}