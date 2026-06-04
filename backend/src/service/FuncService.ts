import { createFuncionario, updateFuncionario } from "../dto/FuncionaroDTO";
import FuncRepos from "../repository/FuncRepo";

export default class FuncService{
    constructor(private funcRep:FuncRepos){}
    public create(func:createFuncionario){
       return this.funcRep.create(func)
    }
    public update(func:updateFuncionario){
        return this.funcRep.update(func)
    }

    public delete(usuario:string){
        return this.funcRep.delete(usuario)
    }

    public get(){
        return this.funcRep.get()
    }
}