import { TipoStatus } from "../../prisma/generated/prisma/enums";
import { prisma } from "../config/prisma";
import { createPeca, updatePeca } from "../dto/PecasDTO";

export default class PecasRepo{
      public async create(peca:createPeca){
          const Peca= await prisma.pecas.create({
            data:{
                  aeronave_id:peca.aeronave_id,
                  nome:peca.nome,
                  tipo:peca.tipo,
                  fornecedor:peca.fornecedor,
                  status:TipoStatus.EM_PRODUCAO,

            },
            select:{
                  aeronave_id:true,
                  nome:true,
                  tipo:true,
                  fornecedor:true,
                  status:true
            }
          })
          return Peca
      }

      public async update(peca:updatePeca){
            const Peca= await prisma.pecas.update({
                  where:{nome_aeronave_id:{nome:peca.nome,aeronave_id:peca.aeronave_id}},
                  data:{
                        tipo:peca.tipo,
                        status:peca.status,
                        fornecedor:peca.fornecedor
                  },
                  select:{
                         aeronave_id:true,
                  nome:true,
                  tipo:true,
                  fornecedor:true,
                  status:true
                  }
            })
            return Peca
      }
      public async delete(nome:string,aeronave_id:string){
              const Peca= await prisma.pecas.delete({
                  where:{nome_aeronave_id:{
                        nome:nome,
                        aeronave_id:aeronave_id
                  }},
                  select:{
                           aeronave_id:true,
                  nome:true,
                  tipo:true,
                  fornecedor:true,
                  status:true
                  }
              })
      }
      public async get(aeronave_id:string){
             const Pecas=await prisma.pecas.findMany({
                  where:{aeronave_id:aeronave_id},
                  select:{
                           aeronave_id:true,
                  nome:true,
                  tipo:true,
                  fornecedor:true,
                  status:true
                  }
             })
             return Pecas
      }
}