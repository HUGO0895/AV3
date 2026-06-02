import { useState } from 'react';
import '../index.css';
import Navbar from '../components/navbar';
import TestesDaAeronave from '../components/testes/verTestes';
import FormCadastroTeste from '../components/testes/cadastro';

function VerTestes() {
    const [aeronaves] = useState([
        { 
            codigo: 'AC-001', 
            modelo: 'Boeing 737', 
            tipo: 'COMERCIAL' as const, 
            capacidade: 150, 
            alcance: 5700, 
            testes: [
                { 
                    tipo: 'ELÉTRICO' as const, 
                    resultado: 'APROVADO' as const, 
                    data: '2026-04-20' 
                },
                { 
                    tipo: 'AERODINÂMICO' as const, 
                    resultado: 'REPROVADO' as const, 
                    data: '2026-04-25' 
                }
            ]
        }
    ]);

    const [escolhaAero, setEscolhaAero] = useState(0);
    const [modalCadastro, setModalCadastro] = useState(false);

    return (
        <div> 
            <Navbar/>
            <div className="max-w-5xl w-full mx-auto m-5 p-8 bg-white border border-gray-200 rounded-3xl shadow-sm flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className='font-bold text-2xl text-[#123354]'>Controle de Qualidade</h1>
                        <p className='text-sm text-gray-500'>Gerenciamento de testes e inspeções</p>
                    </div>
                    <button 
                        onClick={() => setModalCadastro(true)}
                        className='bg-[#123354] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#1a4a7a] transition-all shadow-lg'
                    >
                        + Novo Teste
                    </button>
                </div>
            
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-2">Selecione a Aeronave</label>
                    <select 
                        className='border-2 rounded-2xl max-w-xs px-4 py-3 border-gray-100 text-[#123354] font-bold outline-none focus:border-[#123354]' 
                        onChange={(e) => setEscolhaAero(Number(e.target.value))}
                    >
                        {aeronaves.map((aero, idx) => (
                            <option key={aero.codigo} value={idx}>{aero.modelo} ({aero.codigo})</option>
                        ))}
                    </select>
                </div>

                <TestesDaAeronave 
                    aberto={true} 
                    testes={aeronaves[escolhaAero].testes} 
                />

                <FormCadastroTeste 
                    aberto={modalCadastro} 
                    fechado={() => setModalCadastro(false)} 
                />
            </div>
        </div>
    );
}

export default VerTestes;