import { Tipo } from "../../prisma/generated/prisma/enums";
import { createTest, updateTest } from "../dto/TesteDTO";
import TesteRepo from "../repository/TestesRepo";

export default class TesteService{
    constructor(private TestRep:TesteRepo){}

    public async create(teste:createTest){
      return this.TestRep.create(teste)
    }

    public async update(teste:updateTest){
        return this.TestRep.update(teste)
    }

    public async delete(idAeronave:string,tipo:Tipo){
        return  this.TestRep.delete(idAeronave,tipo)
    }

    public async get(idAeronave:string){
        return this.TestRep.get(idAeronave)
    }
}