import { Status } from "../../prisma/generated/prisma/enums";
import { prisma } from "../config/prisma";
import { createEtapa, updateEtapa } from "../dto/EtapasDTO";

export default class EtapasRepo{
       public async create(etapa:createEtapa){
           const Etapa=await prisma.etapas.create({
            data:{
                nome:etapa.nome,
                prazo: new Date(etapa.prazo),
                aeronave_id:etapa.aeronave_id,
                status:Status.PENDENTE,
               funcionarios:{
                create: etapa.funcionarios.map((id:number)=>({
                    funcionario_id:id
                }))
               }
            },
            select:{
                nome:true,
                prazo:true,
                aeronave_id:true,
                status:true,
                funcionarios:{
                    select:{
                        funcionario:{select:{usuario:true}}
                    }
                }
            }
           })
           return Etapa
       }
       
       public async update(etapa:updateEtapa){
           const Etapa=await prisma.etapas.update({
            where:{nome_aeronave_id:{nome:etapa.nome,aeronave_id:etapa.aeronave_id}},
            data:{
                prazo:new Date(etapa.prazo),
                status:etapa.status,
                 funcionarios:{
                set: etapa.funcionarios.map((id:number)=>({
                    funcionario_id_etapa_nome_etapa_aeronave_id:{
                      funcionario_id:id,
                       etapa_nome: etapa.nome,
      etapa_aeronave_id: etapa.aeronave_id
                    }
                
                }))
               }
            },
             select:{
                nome:true,
                prazo:true,
                aeronave_id:true,
                status:true,
              
              funcionarios:{
                    select:{
                        funcionario:{select:{usuario:true}}
                    }
                }
                    
            }
           })
           return Etapa
       }

       public async delete(id:string,nome:string){
             const Etapa=await prisma.etapas.delete({
                where:{nome_aeronave_id:{nome:nome,aeronave_id:id}},
                 select:{
                nome:true,
                prazo:true,
                aeronave_id:true,
                status:true,
                funcionarios:{
                    select:{
                        funcionario:{select:{usuario:true}}
                    }
                }
            }
             })
             return Etapa
       }

       public async get(idDaAeronave:string){
          const Etapas=await prisma.etapas.findMany({
            where:{aeronave_id:idDaAeronave},
              select:{
                nome:true,
                prazo:true,
                aeronave_id:true,
                status:true,
                funcionarios:{
                    select:{
                        funcionario:{select:{usuario:true}}
                    }
                }
              }
        
        }
        

          )
        return Etapas}

        
}