import { Resultado, Tipo } from "../../prisma/generated/prisma/enums"
import { prisma } from "../config/prisma"
import {createTest, updateTest} from "../dto/TesteDTO"
export default class TesteRepo{
    public async create(teste:createTest){
         const Test= await prisma.testes.create({
            data:{
                tipo:teste.tipo,
                resultado:Resultado.PENDENTE,
                aeronave_id:teste.aeronave_id
            },
            select:{
                tipo:true,
                resultado:true,
                aeronave_id:true
            }
        
         })
         return Test
    }

    public async update(teste:updateTest){
        const Teste= await prisma.testes.update({
            where:{tipo_aeronave_id:{
                tipo:teste.tipo,
                aeronave_id:teste.aeronave_id
            }},
            data:{
              resultado:teste.resultado
            },
            select:{
                 tipo:true,
                resultado:true,
                aeronave_id:true
            }
        })
        return Teste
    }

    public async delete(idAeronave:string,tipo:Tipo){
           const Teste= await prisma.testes.delete({
            where:{tipo_aeronave_id:{
                tipo:tipo,
                aeronave_id:idAeronave
            }},
            select:{
                 tipo:true,
                resultado:true,
                aeronave_id:true
            }
           })

           return Teste
    }

    public async get(aeronave_id:string){
             const Testes= await prisma.testes.findMany({
                where:{aeronave_id:aeronave_id},
                select:{
                    tipo:true,
                resultado:true,
                aeronave_id:true
                }
             })

             return Testes
    }
}