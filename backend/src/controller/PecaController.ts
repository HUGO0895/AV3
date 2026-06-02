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
    static async delete(){
        try{
           

        }catch(erro){

        }
    }
}