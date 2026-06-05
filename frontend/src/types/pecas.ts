
export interface createPeca{
    aeronave_id:string,
    nome:string,
    tipo:"NACIONAL" | "IMPORTADA",
    fornecedor:string,

}

export interface updatePeca{
    aeronave_id:string,
    nome:string,
    tipo?:"NACIONAL" | "IMPORTADA",
    fornecedor?:string,
    status?:"EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA"
}

export interface ResponsePeca{
     aeronave_id:string,
    nome:string,
    tipo:"NACIONAL" | "IMPORTADA",
    fornecedor:string,
    status:"EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA"
}
