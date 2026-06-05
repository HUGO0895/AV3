import { Request, Response } from "express";
import AeroRepo from "../repository/AeroRepo";
import AeroService from "../service/AeroService";
import { createAero, updateAero } from "../dto/AeroDTO";

export default class AeroController{
    private static AeroRep=new AeroRepo()
    private static AeroServ=new AeroService(AeroController.AeroRep)

    static async create(req:Request,res:Response){
       try{
         console.log(req.body)
        const aeronave:createAero=req.body
        const resposta= await AeroController.AeroServ.create(aeronave)
        return res.status(200).json({
             status:"sucess",
            resposta
        })
       }catch(erro){
         return res.status(400).json({
            status:"error",
            resposta:"Não Foi possivel criar uma Aeronave"
         })
       }
    }
    static async update(req:Request,res:Response){
       try{
         const aeronave:updateAero=req.body
         const resposta=await AeroController.AeroServ.update(aeronave)
          return res.status(200).json({
             status:"sucess",
            resposta
        }) 
       }catch(erro){
          return res.status(400).json({
            status:"error",
            resposta:"Não Foi possivel atualizar essa Aeronave"
         })
       }
    }
    static async  delete(req:Request,res:Response){
       try{
          const {id}=req.params
          const resposta= await AeroController.AeroServ.delete(id as string)
          return res.status(200).json({
            status:"sucess",
            resposta
          })
       }catch(erro){
                return res.status(400).json({
            status:"error",
            resposta:"Não Foi possivel deletar essa Aeronave"
         })
       }
    }
    static async get(req:Request,res:Response){
        try{
            const resposta=await AeroController.AeroServ.get()
             return res.status(200).json({
            status:"sucess",
            resposta
          })
        }catch(erro){
               return res.status(400).json({
            status:"error",
            resposta:"Não foi possivel achar Aeronaves"
         })
        }
    }
}