import express from 'express'
import cors from 'cors'
import path from 'path'
const app=express()

app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(express.json());

const Port=3000


app.listen(Port,()=>{
    console.log("Server is running");
    console.log(`http://localhost:${Port}`)


});