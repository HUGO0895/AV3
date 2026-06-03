import { prisma } from "../config/prisma";
import { createFuncionario } from "../dto/FuncionaroDTO";

export  default class FuncRepos{
      public async create(func:createFuncionario){
          const Func= await prisma.funcionario.create({
            data:{
                nome:func.nome,
                telefone:func.telefone,
                endereco:func.endereco,
                nivelPermisssao:func.nivelPermissao,
                senha:func.senha,
                usuario:func.usuario
            },
            select:{
                nome:true,
                telefone:true,
                endereco:true,
                nivelPermisssao:true,
                usuario:true
            }
          })
      }
}