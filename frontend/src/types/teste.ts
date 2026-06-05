export interface createTest {
    tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO"
    aeronave_id: string
}
 
export interface updateTest {
    tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO"
    resultado: "APROVADO" | "REPROVADO" | "PENDENTE"
    aeronave_id: string
}
 
export interface ResponseTips {
    tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO"
    resultado: "APROVADO" | "REPROVADO" | "PENDENTE"
    aeronave_id: string
}
