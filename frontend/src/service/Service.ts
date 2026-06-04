export default abstract class Service<T,K,C>{
       private url:string
    constructor(url:string){
        this.url=url
    }
    public async get(){
           const resposta=await fetch(this.url)
           return resposta
       }
   
       public async create(elemento:T){
           const resposta=await fetch(this.url,{
               method:"POST",
                headers:{"Content-Type": "application/json" },
                body:JSON.stringify(elemento)
           })
   
           return resposta
       }
   
       public async update(elemento:C){
          const resposta=await fetch(this.url,{
           method:"PUT",
           headers:{"Content-Type": "application/json" },
           body:JSON.stringify(elemento)
          })
   
          return resposta
       }
   
       public async delete(id:K){
        let urlDelete;
           if(Array.isArray(id)){
             urlDelete=''
              for(const x of id){
                urlDelete+=x+'/'
              }
              urlDelete=urlDelete.slice(0,urlDelete.length-1)
           }
           else{
            urlDelete=id
           }

           const resposta=await fetch(`${this.url}/${urlDelete}`,{
            method:"DELETE"
           })
   
           return resposta
       }

}