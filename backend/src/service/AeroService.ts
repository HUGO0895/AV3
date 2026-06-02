import { createAero, updateAero } from "../dto/AeroDTO";
import AeroRepo from "../repository/AeroRepo";

export default class AeroService{
    constructor(private AeronaveRepo:AeroRepo){}

    public create(aeronave:createAero){
        return  this.AeronaveRepo.createAeronave(aeronave)
    }
    public update(aeronave:updateAero){
      return this.AeronaveRepo.updateAeronave(aeronave)
    }
    public delete(id:string){
        return  this.AeronaveRepo.deleteAero(id)
    }
    public get(){
        return this.AeronaveRepo.getAero()
    }
}