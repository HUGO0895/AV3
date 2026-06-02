import { prisma } from "../config/prisma";
import { createAero, updateAero } from "../dto/AeroDTO";

export default class AeroRepo{
    public async  createAeronave(aeronave:createAero){
         const retorno=await prisma.aeronaves.create({
            data:{
                id:aeronave.id,
                modelo:aeronave.modelo,
                capacidade:aeronave.capacidade,
                alcance:aeronave.alcance,
                tipo:aeronave.tipo
            },
            select:{
                id:true,
                modelo:true,
                capacidade:true,
                alcance:true,
                tipo:true
            }
         })
         return retorno
    }

    public async  updateAeronave(aeronave:updateAero){
        const retorno=await prisma.aeronaves.update({
            where:{id:aeronave.id},
            data:{
              modelo:aeronave.modelo,
              capacidade:aeronave.capacidade,
              alcance:aeronave.capacidade,
              tipo:aeronave.tipo
            },
             select:{
                id:true,
                modelo:true,
                capacidade:true,
                alcance:true,
                tipo:true
            }
        })
        return retorno
    }

    public  async deleteAero(id:string){
       const retorno=await prisma.aeronaves.delete({
        where:{id:id},
         select:{
                id:true,
                modelo:true,
                capacidade:true,
                alcance:true,
                tipo:true
            }
       })
       return retorno
    }

    public async getAero(){
        const retorno=await prisma.aeronaves.findMany({
            select:{
                id:true,
                modelo:true,
                capacidade:true,
                alcance:true,
                tipo:true
            }
        })
        return retorno
    }
}