import { useState, useEffect } from 'react';
import '../index.css';
import Navbar from '../components/navbar';
import TestesDaAeronave from '../components/testes/verTestes';
import FormCadastroTeste from '../components/testes/cadastro';
import TesteServ from '../service/TesteService';
import AeroServ from '../service/AeronaveService';
import { ResponseTips } from '../types/teste';
import { ResponseAero } from '../types/aeronave';

function VerTestes() {
    const [aeronaves, setAeronaves] = useState<ResponseAero[]>([])
    const [aeronave_id, setAeronave_id] = useState<string>('')
    const [testes, setTestes] = useState<ResponseTips[]>([])
    const [modalCadastro, setModalCadastro] = useState(false)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        const buscarAeronaves = async () => {
            const resposta = await AeroServ.get(undefined)
            if (resposta.status === 'sucess') setAeronaves(resposta.resposta)
        }
        buscarAeronaves()
    }, [])

    const buscarTestes = async (id: string) => {
        if (!id) return
        const resposta = await TesteServ.get(id)
        if (resposta.status === 'sucess') {
            setTestes(resposta.resposta)
        } else {
            setErro(resposta.resposta)
        }
    }

    useEffect(() => {
        if (aeronave_id) buscarTestes(aeronave_id)
    }, [aeronave_id])

    return (
        <div>
            <Navbar />
            <div className="max-w-5xl w-full mx-auto m-5 p-8 bg-white border border-gray-200 rounded-3xl shadow-sm flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className='font-bold text-2xl text-[#123354]'>Controle de Qualidade</h1>
                        <p className='text-sm text-gray-500'>Gerenciamento de testes e inspeções</p>
                    </div>
                    <button
                        onClick={() => { setErro(null); setModalCadastro(true); }}
                        className='bg-[#123354] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#1a4a7a] transition-all shadow-lg'
                    >
                        + Novo Teste
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-2">Selecione a Aeronave</label>
                    <select
                        className='border-2 rounded-2xl max-w-xs px-4 py-3 border-gray-100 text-[#123354] font-bold outline-none focus:border-[#123354]'
                        value={aeronave_id}
                        onChange={(e) => setAeronave_id(e.target.value)}
                    >
                        <option value="" disabled>Selecione uma aeronave...</option>
                        {aeronaves.map((aero) => (
                            <option key={aero.id} value={aero.id}>{aero.id}</option>
                        ))}
                    </select>
                </div>

                {erro && <p className='text-red-500 text-sm font-bold'>{erro}</p>}

                <TestesDaAeronave
                    aberto={true}
                    testes={testes}
                    onAtualizar={() => { setErro(null); buscarTestes(aeronave_id); }}
                    aeronave_id={aeronave_id}
                />

                <FormCadastroTeste
                    aberto={modalCadastro}
                    fechado={() => setModalCadastro(false)}
                    aeronave_id={aeronave_id}
                    onSalvar={() => { setErro(null); buscarTestes(aeronave_id); }}
                    onErro={(msg) => setErro(msg)}
                />
            </div>
        </div>
    );
}

export default VerTestes;