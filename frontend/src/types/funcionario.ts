export interface createFuncionario{
    nome: string,
    telefone: string,
    endereco: string,
    usuario: string,
    senha: string,
    nivelPermissao: "ADMNISTRADOR" | "OPERADOR" | "ENGENHEIRO"
}

export interface updateFuncionario{
    nome?: string,
    telefone?: string,
    endereco?: string,
    usuario: string,
    nivelPermissao: "ADMNISTRADOR" | "OPERADOR" | "ENGENHEIRO"
}

export interface ResponseFuncionario{
    id: number,
    nome: string,
    telefone: string,
    endereco: string,
    usuario: string,
    nivelPermissao: "ADMNISTRADOR" | "OPERADOR" | "ENGENHEIRO"
}