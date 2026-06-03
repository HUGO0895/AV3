import { Permissao } from "../../prisma/generated/prisma/enums";

export interface createFuncionario{
       nome:string,
       telefone:string,
       endereco:string,
       usuario:string,
       senha:string,
       nivelPermissao:Permissao
}

export interface updateFuncionario{
    nome?:string,
    telefone?:string
    endereco?:string
    usuario:string
    nivelPermissao:Permissao

}

export interface ResponseFuncionario{
     nome:string,
       telefone:string,
       endereco:string,
       usuario:string,
       nivelPermissao:Permissao

}
