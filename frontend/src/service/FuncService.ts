import { createFuncionario, updateFuncionario } from "../types/funcionario";
import Service from "./Service";

class FuncionarioService extends Service<createFuncionario,updateFuncionario,string>{
    constructor(){
        super("http://localhost:3000/funcionarios")
    }
}

const FuncServ= new FuncionarioService()

export default FuncServ