import '../index.css'
import logo from '../assets/aerocode3.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LoginPage(){
const navigate = useNavigate()
const [usuario, setUsuario] = useState('')
const [senha, setSenha] = useState('')
const [erro, setErro] = useState('')
const [loading, setLoading] = useState(false)

async function handleLogin(){
    setErro('')
    setLoading(true)
    try{
        const res = await fetch('http://localhost:3000/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({usuario, senha})
        })
        const data = await res.json()
        if(!res.ok) return setErro(data.resposta || 'Erro ao realizar login')
        
        localStorage.setItem('token', data.resposta.token)
        localStorage.setItem('nivelPermissao', data.resposta.nivelPermissao)
        navigate('/aeronaves')
    }catch{
        setErro('Erro ao conectar com o servidor')
    }finally{
        setLoading(false)
    }
}

return(
<div className='m-0 p-0'>
<div className='max-w-6xl mx-auto  sm:ml-auto p-2 md:w-250 h-screen  flex flex-row justify-center  '>
<div className='flex flex-col md:mt-10 items-center '><img src={logo} width={350} alt="" />
<div className='font-bold text-[64px]'>Bem-Vindo </div>
<div className='font-bold italic text-[20px] text-[#78787A] mb-10'>Insira seu Usuário e sua Senha</div>
<form action="" className='flex flex-col gap-2 items-center '> 
<div className='flex flex-col gap-2 '>
<label className='font-bold text-[20px] p-1' htmlFor="">Usuário:</label>
<input className='w-full border rounded-full h-8 p-5  sm:w-100 mx-auto focus:outline-none' type="text" placeholder='Insira seu Usuário' value={usuario} onChange={e => setUsuario(e.target.value)} />
<label className='font-bold text-[20px] p-1' htmlFor="">Senha:</label>
<input className='border rounded-full h-8 p-5 w-full sm:w-100 mx-auto focus:outline-none' type="password" placeholder='Insira sua Senha' value={senha} onChange={e => setSenha(e.target.value)} />
</div>
{erro && <p className='text-red-500 font-semibold'>{erro}</p>}
<button className='border rounded-full text-xl md:text-4xl w-full md:w-80 p-1 font-bold bg-[#123354] text-white hover:scale-105 duration-300' type='button' onClick={handleLogin} disabled={loading}>
    {loading ? 'Entrando...' : 'Enviar'}
</button>
</form>
</div>
</div>
</div>
  )
}
export default LoginPage;