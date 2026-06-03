import { prisma } from "../config/prisma";
import { createEtapa, updateEtapa } from "../dto/EtapasDTO";
import EtapasRepo from "../repository/EtapasRepo";

export default class EtapaService{
        constructor(private  Etaparepo:EtapasRepo){}
        public create(etapa:createEtapa){
            return this.Etaparepo.create(etapa)
        }

        public async update(etapa:updateEtapa){
            const etapaAntiga=await prisma.pecas.findUnique({
                where:{nome_aeronave_id:{nome:etapa.nome,aeronave_id:etapa.aeronave_id}}
            })
           const informaçoesInvalidas={
                "PENDENTE":["CONCLUIDA"],
                "ANDAMENTO":["ANDAMENTO","PENDENTE"],
                "CONCLUIDA":["ANDAMENTO","PENDENTE"]
            }
            if(informaçoesInvalidas[etapaAntiga.status].includes(etapa.status))
                 throw new Error(`Não é possivel mudar o status de ${etapaAntiga.status} para ${etapa.status}`)
          return this.Etaparepo.update(etapa)
        }
        public delete(idAeronave:string,nome:string){
             return this.Etaparepo.delete(idAeronave,nome)
        }

        public get(idAeronave:string){
              return this.Etaparepo.get(idAeronave)
        }

}