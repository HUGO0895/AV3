import Peca from "./pecas";
enum tipoAero {
    militar="militar",
    comercial='comercial'
}

export default interface Aeronave {
    id:string,
    modelo:string,
    capacidade:number,
    alcance:number,
    tipo: tipoAero;
    pecas:Array<Peca>
    etapas:Array<Etapa>

}