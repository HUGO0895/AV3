import { Request, Response } from "express";
import PecasRepo from "../repository/PecasRepo";
import PecaServ from "../service/PecaService";
import { createPeca, updatePeca } from "../dto/PecasDTO";

export default class PecaController{
    private static Pecarepo=new PecasRepo()
    private static PecaService= new PecaServ(this.Pecarepo)

    static async create(req:Request,res:Response){
        try{
        const peca:createPeca=req.body
        const resposta= await this.PecaService.create(peca)
        return res.status(201).json({
            status:"sucess",
            resposta
        })
        }catch(erro){
             return res.status(400).json({
                status:"error",
                resposta:"Dados Inválidos"
             })
        }
        }

    static async update(req:Request,res:Response){
           try{
        const peca:updatePeca=req.body
        const resposta= await this.PecaService.update(peca)
        return res.status(201).json({
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
           const resposta= await this.PecaService.delete(id as string,nome as string)
           return res.status(200).json({
            status:"sucess",
            resposta
           })
        }catch(erro){
           return res.status(400).json({
            status:"error",
             resposta:"Dados Inválidos"
           })
        }
    }
    static async get(req:Request,res:Response){
       try{
          const {id}=req.params
          const resposta= await this.PecaService.get(id as string)
          return res.status(200).json({
            status:"sucess",
            resposta
          })
       }catch(erro){
             return res.status(400).json({
            status:"error",
             resposta:"Dados Inválidos"
           })
       }
    }
}