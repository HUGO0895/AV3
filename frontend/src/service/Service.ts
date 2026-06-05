export default abstract class Service<T,K,C>{
       private url:string
constructor(url:string){
this.url=url
}

private getHeaders(){
    const token = localStorage.getItem('token')
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    }
}

public async get(elemento?:string){
let  resposta;
if (typeof elemento=='string'){
resposta=await fetch(`${this.url}/${elemento}`,{ headers: this.getHeaders() })
}else{
resposta=await fetch(this.url,{ headers: this.getHeaders() })
}
return resposta.json()
}
public async create(elemento:T){
const resposta=await fetch(this.url,{
method:"POST",
headers: this.getHeaders(),
body:JSON.stringify(elemento)
})
return resposta.json()
}
public async update(elemento:K){
const resposta=await fetch(this.url,{
method:"PUT",
headers: this.getHeaders(),
body:JSON.stringify(elemento)
})
return resposta.json()
}
public async delete(id:C){
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
method:"DELETE",
headers: this.getHeaders()
})
return resposta.json()
}
}