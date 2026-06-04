import { prisma } from "../config/prisma";
import { createFuncionario, updateFuncionario } from "../dto/FuncionaroDTO";

export  default class FuncRepos{
      public async create(func:createFuncionario){
          const Func= await prisma.funcionario.create({
            data:{
                nome:func.nome,
                telefone:func.telefone,
                endereco:func.endereco,
                nivelPermissao:func.nivelPermissao,
                senha:func.senha,
                usuario:func.usuario
            },
            select:{
                id:true,
                nome:true,
                telefone:true,
                endereco:true,
                nivelPermissao:true,
                usuario:true
            }
          })
          return Func
      }

      public async update(func:updateFuncionario){
        const Func=await prisma.funcionario.update({
            where:{usuario:func.usuario},
            data:{
                nome:func.nome,
                telefone:func.telefone,
                endereco:func.endereco,
                nivelPermissao:func.nivelPermissao
            },
            select:{
                id:true,
                nome:true,
                telefone:true,
                endereco:true,
                nivelPermissao:true,
                usuario:true
            }

        })
        return Func
      }

    public async delete(usuario:string){
         const Func=await prisma.funcionario.delete({
            where:{usuario:usuario},
            select:{
                 id:true,
                nome:true,
                telefone:true,
                endereco:true,
                nivelPermissao:true,
                usuario:true
            }
         })
         return Func
    }

    public async get(){
        const Funcs=await prisma.funcionario.findMany({
            select:{
                id:true,
                nome:true,
                telefone:true,
                endereco:true,
                nivelPermissao:true,
                usuario:true
            }
        })
        return Funcs
    }
}