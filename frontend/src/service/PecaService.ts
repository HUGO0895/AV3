import { createPeca, updatePeca } from "../types/pecas";
import Service from "./Service";

class PecaService extends Service<createPeca,updatePeca,Array<string>>{
         constructor(){
             super("http://localhost:3000/peca")
         }
}

const PecaServ=new PecaService()


export default PecaServ