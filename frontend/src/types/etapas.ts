import { Status } from "../../prisma/generated/prisma/enums"

export interface createEtapa{
     nome:string,
     prazo:string,
     aeronave_id:string
     funcionarios?:Array<number>
}

export interface updateEtapa{
    nome:string
    prazo:string,
    status:Status
    aeronave_id:string
    funcionarios?:Array<number>
}

export interface responseEtapa{
    nome:string,
    prazo:string,
    status:Status,
    aeronave_id:string
    funcionarios?:Array<string>
}