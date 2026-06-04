import { tipoAero } from "../../prisma/generated/prisma/enums"

export interface createAero {
    id:string
    modelo:string
    capacidade:number
    alcance:number
    tipo:tipoAero
}

export interface updateAero{
    id:string
    modelo:string
    capacidade:number
    alcance:number
    tipo:tipoAero
}

export interface ResponseAero{
    id:string
    modelo:string
    capacidade:string
    alcance:number
    tipo:tipoAero
}