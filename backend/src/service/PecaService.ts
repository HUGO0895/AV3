import { prisma } from "../config/prisma";
import { createPeca, updatePeca } from "../dto/PecasDTO";
import PecasRepo from "../repository/PecasRepo";

export default class PecaServ{
         constructor(private Pecarepo:PecasRepo ){}
         public create(peca:createPeca){
            return this.Pecarepo.create(peca)
         }
         public async update(peca:updatePeca){
            const pecaAntiga=await prisma.pecas.findUnique({
                where:{nome_aeronave_id:{nome:peca.nome,aeronave_id:peca.aeronave_id}}
            })
            const informacoesInvalidas={
                "EM_PRODUCAO":["PRONTA"],
                "EM_TRANSPORTE":["EM_PRODUCAO","EM_PRODUCAO"],
                "PRONTA":["EM_PRODUCAO","EM_TRANSPORTE","PRONTA"]
            }
            if(informacoesInvalidas[pecaAntiga.status].includes(peca.status))
                throw  new Error(`Não é possivel mudar o Status da Peca de ${pecaAntiga.status} para ${peca.status}`)

            return this.Pecarepo.update(peca)
         }
         public delete(id:string,nome:string){
            return this.Pecarepo.delete(nome,id)
         }
         public get(aeronave_id:string){
            return this.Pecarepo.get(aeronave_id)
         }
}
