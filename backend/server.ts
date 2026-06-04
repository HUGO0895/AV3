import express from 'express'
import cors from 'cors'
import path from 'path'
const app=express()
import rotas from './router'
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(express.json());
app.use(rotas)
const Port=3000


app.listen(Port,()=>{
    console.log("Server is running");
    console.log(`http://localhost:${Port}`)


});