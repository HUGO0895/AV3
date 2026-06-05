import { prisma } from "../config/prisma";
import { createFuncionario, updateFuncionario } from "../dto/FuncionaroDTO";
import bcrypt from "bcryptjs";

export  default class FuncRepos{
      public async create(func:createFuncionario){
          const hash = await bcrypt.hash(func.senha, 10);
          const Func= await prisma.funcionario.create({
            data:{
                nome:func.nome,
                telefone:func.telefone,
                endereco:func.endereco,
                nivelPermissao:func.nivelPermissao,
                senha:hash,
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

    public async login(usuario:string){
        return await prisma.funcionario.findUnique({
            where:{usuario}
        })
    }
    
}