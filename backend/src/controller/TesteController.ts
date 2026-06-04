import { Request, Response } from "express";
import TesteRepo from "../repository/TestesRepo";
import TesteService from "../service/TesteService";
import { createTest, updateTest } from "../dto/TesteDTO";
import { Tipo } from "../../prisma/generated/prisma/enums";

export default class TesteController{
       private static TesteRepositori=new TesteRepo()
       private static ServiceTest= new TesteService(TesteController.TesteRepositori)

       static async create(req:Request,res:Response){
            try{
             const teste:createTest=req.body
             const resposta= await TesteController.ServiceTest.create(teste)
             return res.status(200).json({
                status:"sucess",
                resposta
             })
            }catch(erro){
                  return res.status(400).json({
                status:"error",
                resposta:"Não foi possivel criar esse Teste"
             })
            }
       }

       static async update(req:Request,res:Response){
             try{
               const teste:updateTest=req.body
               const resposta=await TesteController.ServiceTest.update(teste)
              return res.status(200).json({
                status:"sucess",
                resposta
             })
            }catch(erro){
                   return res.status(400).json({
                status:"error",
                resposta:erro
             })
             }
       }

       static async delete(req:Request,res:Response){
        try{
            const {id,nome}=req.params 
            if(!(nome as string  in Tipo))
                return res.status(400).json({
                 status:"error",
                 resposta:"Tipo de Teste equivocado"
            })
            const resposta=await TesteController.ServiceTest.delete(id as string,nome as Tipo)
            return res.status(200).json({
                status:"sucess",
                resposta
            })
        }catch(erro){
            return res.status(400).json({
                status:"error",
                resposta:"Não foi possivel deletar o Teste"
            })

        }
       }

       static async get(req:Request,res:Response){
         try{
            const{id}= req.params
            const resposta=await TesteController.ServiceTest.get(id as string)
            return res.status(200).json({
                status:"sucess",
                resposta
            })

         }catch(erro){
             return res.status(400).json({
                status:"error",
                resposta:"Não foi possivel achar Testes dessa Aeronave"
             })
         }
       }
}