import { Request, response, Response } from "express";
import EtapasRepo from "../repository/EtapasRepo";
import EtapaService from "../service/EtapaService";
import { createEtapa, updateEtapa } from "../dto/EtapasDTO";
import { RecordWithTtl } from "node:dns";

export default class EtapaControler{
    private static EtapaRepositorie=new EtapasRepo()
    private static EtapaServ= new EtapaService(EtapaControler.EtapaRepositorie)
    static async create(req:Request,res:Response){
        try{
        const etapa:createEtapa=req.body
        const resposta=await EtapaControler.EtapaServ.create(etapa)
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
    static async update(req:Request,res:Response){
          try{
            const etapa:updateEtapa=req.body
            const resposta= await EtapaControler.EtapaServ.update(etapa)
            return res.status(200).json({
              status:"sucess",
             resposta
            })
            
          }catch(erro){
            if(erro instanceof Error)
              return res.status(400).json({
            status:"error",
            resposta:erro.message
        })

         return res.status(400).json({
            status:"error",
            resposta:"Não foi possivel atualizar os dados dessa Etapa"
            
          })
    }}

    static async delete(req:Request,res:Response){
            try{
                const {id,nome}=req.params
                const resposta=await EtapaControler.EtapaServ.delete(id as string,nome as string)
                  return res.status(200).json({
              status:"sucess",
             resposta
            })
            }catch(erro){
               return res.status(404).json({
            status:"error",
            resposta:"Não foi possivel deletar essa Etapa"
        })
            }
    }
    
    static async get(req:Request,res:Response){
         try{
             const {id}=req.params
             const resposta=await EtapaControler.EtapaServ.get(id as string)
               return res.status(200).json({
              status:"sucess",
             resposta
            })
         }catch(erro){
            return res.status(400).json({
            status:"error",
            resposta:"Não foi possivel encontrar Etapas para essa Aeronave"
        })
         }
    }
}