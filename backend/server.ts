import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import { prisma } from './src/config/prisma'
const app=express()
import rotas from './router'
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(express.json());
app.use(rotas)
const Port=3000

async function seed(){
    const usuarios = [
        { nome:'Admin', telefone:'11999990001', endereco:'Rua A, 1', usuario:'admin', senha:'admin123', nivelPermissao:'ADMINISTRADOR' },
        { nome:'Engenheiro', telefone:'11999990002', endereco:'Rua B, 1', usuario:'eng', senha:'eng123', nivelPermissao:'ENGENHEIRO' },
        { nome:'Operador', telefone:'11999990003', endereco:'Rua C, 1', usuario:'op', senha:'op123', nivelPermissao:'OPERADOR' },
    ] as const

    for(const u of usuarios){
        const existe = await prisma.funcionario.findUnique({ where:{ usuario: u.usuario } })
        if(!existe){
            const hash = await bcrypt.hash(u.senha, 10)
            await prisma.funcionario.create({ data:{ ...u, senha: hash } })
        }
    }
    console.log('Seed concluído')
}

app.listen(Port, async ()=>{
    console.log("Server is running");
    console.log(`http://localhost:${Port}`)
    await seed()
});