export default class Aeronaves{
    private url:string
    constructor(url:string){
        this.url=url
    }
    public async get(){
        const resposta= await fetch(this.url,{
            method:
        })
    }
} 