import { TipoPecas, TipoStatus } from "../../prisma/generated/prisma/enums";

export interface createPeca{
    aeronave_id:string,
    nome:string,
    tipo:TipoPecas,
    fornecedor:string,

}

export interface updatePeca{
    aeronave_id:string,
    nome:string,
    tipo?:TipoPecas,
    fornecedor?:string,
    status?:TipoStatus
}

export interface ResponsePeca{
     aeronave_id:string,
    nome:string,
    tipo:TipoPecas,
    fornecedor:string,
    status:TipoStatus
}
