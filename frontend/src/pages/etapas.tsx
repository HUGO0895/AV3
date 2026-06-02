import { useState } from 'react';
import '../index.css';
import EtapasDaAeronave from '../components/etapas/etapasAeronave'; 
import Navbar from '../components/navbar';
import FormCadastroEtapa from '../components/etapas/formCadastroEtapas';

const aeronavesComEtapas = [
    { 
        id: 'AC-001', 
        modelo: 'Boeing 737', 
        tipo: 'COMERCIAL', 
        alcance: 5000, 
        capacidade: 180,
        pecas: [
            { nome: 'Turbina CFM56', status: 'OPERACIONAL', fornecedor: 'GE Aviation', tipo: 'MOTOR' },
            { nome: 'Trem de Pouso Principal', status: 'MANUTENÇÃO', fornecedor: 'Safran', tipo: 'ESTRUTURAL' }
        ],
        etapas: [
            { nome: 'Inspeção de Turbinas', prazo: '2026-05-10', status: 'CONCLUIDA', funcionarios: ['Hugo', 'Vitor Bomfim'] },
            { nome: 'Revisão Elétrica', prazo: '2026-06-15', status: 'ANDAMENTO', funcionarios: ['Mateus'] }
        ]
    },
    { 
        id: 'AC-002', 
        modelo: 'KC-390', 
        tipo: 'MILITAR', 
        alcance: 2800, 
        capacidade: 80,
        pecas: [
            { nome: 'Rampa de Carga', status: 'OPERACIONAL', fornecedor: 'Embraer', tipo: 'HIDRÁULICO' },
            { nome: 'Radar GlobalEye', status: 'OPERACIONAL', fornecedor: 'Saab', tipo: 'AVIÔNICO' }
        ],
        etapas: [
            { nome: 'Ajuste de Rampa', prazo: '2026-05-01', status: 'ANDAMENTO', funcionarios: ['Hugo'] },
            { nome: 'Calibração de Radar', prazo: '2026-05-20', status: 'PENDENTE', funcionarios: [] }
        ]
    },
    { 
        id: 'AC-003', 
        modelo: 'Airbus A320', 
        tipo: 'COMERCIAL', 
        alcance: 6100, 
        capacidade: 150,
        pecas: [
            { nome: 'Wingtip Fence', status: 'AVARIADO', fornecedor: 'Airbus Parts', tipo: 'AERODINÂMICO' },
            { nome: 'Unidade de Potência Auxiliar (APU)', status: 'OPERACIONAL', fornecedor: 'Honeywell', tipo: 'SISTEMAS' }
        ],
        etapas: [
            { nome: 'Reparo Aerodinâmico', prazo: '2026-04-30', status: 'ANDAMENTO', funcionarios: ['Vitor Bomfim'] }
        ]
    },
    { 
        id: 'AC-004', 
        modelo: 'F-35 Lightning II', 
        tipo: 'MILITAR', 
        alcance: 2200, 
        capacidade: 1,
        pecas: [
            { nome: 'Assento Ejetável', status: 'OPERACIONAL', fornecedor: 'Martin-Baker', tipo: 'SEGURANÇA' },
            { nome: 'Sensor EOTS', status: 'CALIBRAÇÃO', fornecedor: 'Lockheed Martin', tipo: 'AVIÔNICO' }
        ],
        etapas: [
            { nome: 'Verificação de Sistemas de Ejeção', prazo: '2026-05-05', status: 'CONCLUIDA', funcionarios: ['Mateus'] },
            { nome: 'Update de Software Aviônico', prazo: '2026-06-01', status: 'PENDENTE', funcionarios: [] }
        ]
    }
];

function VerEtapas() {
    const [aberto, setAberto] = useState(true);
    const [escolhaAero, setEscolhaAero] = useState(0);
    const [modalCadastro, setModalCadastro] = useState(false);
    const [BuscaNome,setBuscaNome]=useState('')
    const [Status,setStatus]=useState("todos")
    const aeronavesfiltro=aeronavesComEtapas[escolhaAero].etapas.filter((etapa)=>{
        const BateNome= BuscaNome===''|| etapa.nome.toLowerCase().includes(BuscaNome.toLowerCase())
        const BateStatus= Status.toLowerCase()==='todos'|| etapa.status.toLowerCase()===Status.toLocaleLowerCase()
        return BateNome && BateStatus
    })
    return (
           <div>    <Navbar/>
        <div className="max-w-5xl w-full mx-auto m-5 p-8 bg-white border border-gray-200 rounded-3xl shadow-sm flex flex-col gap-6">
        
            <div className='flex justify-between items-center'>   
                
                <h1 className='font-bold text-xl text-[#123354]'>Fluxo de Etapas</h1> 
                 <div>
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">Buscar Nome</label>
                    <input 
                        type="text"
                        placeholder="Ex: Turbina"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-[#123354] transition-all font-medium"
                        value={BuscaNome}
                        onChange={(e) => setBuscaNome(e.target.value)}
                    />
                 </div>
                <button 
                    type='button' 
                    className='bg-[#123354] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#1a4a7a] transition-all active:scale-95'
                    onClick={() => setModalCadastro(true)}
                >
                    Nova Etapa
                </button>
            </div>
          <div className='flex justify-between'>
            <select 
                defaultValue={0} 
                className='border-2 rounded-2xl max-w-xs px-4 py-3 border-gray-100 text-[#123354] font-bold outline-none focus:border-[#123354]' 
                onChange={(e) => {
                    setEscolhaAero(Number(e.target.value));
                    setAberto(true);
                }}
            >
                {aeronavesComEtapas.map((aero, index) => (
                    <option key={aero.id} value={index}>{aero.modelo}</option>
                ))}
            </select>
             <div className='px-8'>
               { ["TODOS",'ANDAMENTO','PENDENTE','CONCLUIDA'].map(((tipo)=>(
                   <button
                                key={tipo}
                                onClick={() => setStatus(tipo)}
                                className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                    Status.toLowerCase() === tipo.toLowerCase()
                                    ? 'bg-[#123354] text-white shadow-md' 
                                    : 'text-gray-400 hover:text-[#123354]'
                                }`}
                            >
                                {tipo}
                            </button>
               ))) }
             </div>
            </div>
            <EtapasDaAeronave 
                aberto={aberto} 
                etapas={aeronavesfiltro} 
            />
            
            <FormCadastroEtapa aberto={modalCadastro} fechado={() => setModalCadastro(false)} />
        </div>
        </div>
    );
}

export default VerEtapas;