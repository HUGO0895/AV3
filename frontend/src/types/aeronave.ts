
export interface createAero {
    id:string
    modelo:string
    capacidade:number
    alcance:number
    tipo:"COMERCIAL" | "MILITAR"
}

export interface updateAero{
    id:string
    modelo:string
    capacidade:number
    alcance:number
    tipo:"COMERCIAL" | "MILITAR"
}

export interface ResponseAero{
    id:string
    modelo:string
    capacidade:number
    alcance:number
    tipo:"COMERCIAL" | "MILITAR"
}