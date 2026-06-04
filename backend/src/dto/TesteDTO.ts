import { Resultado, Tipo } from "../../prisma/generated/prisma/enums"

export interface createTest{
    tipo:Tipo
    aeronave_id:string
}

export interface updateTest{
    tipo:Tipo
    resultado:Resultado
    aeronave_id:string
}

export interface ResponseTips{
    tipo:Tipo
    resultado:Resultado
    aeronave_id:string
}