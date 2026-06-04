import { createEtapa, updateEtapa } from "../types/etapas";
import Service from "./Service"

class EtapasService extends Service<createEtapa,updateEtapa,Array<string>>{
        constructor(){
            super("http://localhost:3000/etapas")
        }
}

const EtapaServ= new EtapasService()

export default EtapaServ