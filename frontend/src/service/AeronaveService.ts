import { createAero, updateAero } from "../types/aeronave";
import Service from "./Service";

class AeronaveService extends Service<createAero,updateAero,string>{
    constructor(){
        super("http://localhost:3000/aeronaves")
    }
}

const AeroServ=new AeronaveService()
export default AeroServ