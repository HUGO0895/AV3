import { useState } from 'react';
import '../../index.css'
import PecasdeAeronaves from './pecasdeAerovanes';
import FormCadastroPeca from './cadastrarPecas';
 const aeronavesMocadas = [
    { 
        id: 'AC-001', 
        modelo: 'Boeing 737', 
        tipo: 'COMERCIAL', 
        alcance: 5000, 
        capacidade: 180,
        pecas: [
            { nome: 'Turbina CFM56', status: 'PRONTA', fornecedor: 'GE Aviation', tipo: 'IMPORTADA' },
            { nome: 'Trem de Pouso', status: 'EM PRODUÇÃO', fornecedor: 'Safran', tipo: 'IMPORTADA' }
        ],
        etapas: [
            { nome: 'Montagem de Fuselagem', prazo: '2026-05-10', status: 'ANDAMENTO', funcionarios: ['Hugo', 'Vitor Bomfim'] },
            { nome: 'Instalação Elétrica', prazo: '2026-06-15', status: 'PENDENTE', funcionarios: [] }
        ],
        testes: [
            { tipo: 'ESTRUTURAL', resultado: 'APROVADO', data: '2026-04-20' }
        ]
    },
    { 
        id: 'AC-002', 
        modelo: 'KC-390', 
        tipo: 'MILITAR', 
        alcance: 2800, 
        capacidade: 80,
        pecas: [
            { nome: 'Rampa de Carga', status: 'PRONTA', fornecedor: 'Embraer', tipo: 'NACIONAL' },
            { nome: 'Radar GlobalEye', status: 'EM TRANSPORTE', fornecedor: 'Saab', tipo: 'IMPORTADA' }
        ],
        etapas: [
            { nome: 'Pintura Técnica', prazo: '2026-04-30', status: 'CONCLUIDA', funcionarios: ['Mateus'] }
        ],
        testes: [
            { tipo: 'SISTEMAS', resultado: 'APROVADO', data: '2026-04-22' }
        ]
    },
    { 
        id: 'AC-003', 
        modelo: 'Airbus A320', 
        tipo: 'COMERCIAL', 
        alcance: 6100, 
        capacidade: 150,
        pecas: [
            { nome: 'Wingtip Fence', status: 'EM PRODUÇÃO', fornecedor: 'Airbus Parts', tipo: 'IMPORTADA' }
        ],
        etapas: [],
        testes: []
    }
];

function VerPecas(){
    const [Pecas,setPecas]=useState(true)
    const [EsolhaAero,setEscolhaAero]=useState(0)
    const [ModalCadastro,setModalCadastro]=useState(false)
      const [Busca,setBusca]=useState('TODOS')
    const [BuscaNome,setBuscaNome]=useState('')
    return(
           <div className="max-w-5xl w-full mx-auto  p-8 bg-white border border-gray-200 rounded-3xl shadow-sm flex flex-col gap-6">
            <div className='flex justify-between'>   <h1 className='font-bold text-xl text-[#123354]'>Selecione a Aeronave</h1>
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
                <button type='button' className='bg-[#123354] text-white px-8  rounded-2xl font-semibold hover:bg-[#1a4a7a] transition-all active:scale-95' onClick={()=> setModalCadastro(true)}>Adicionar Pecas</button></div>
            <div className='flex justify-between'>
             <select name="seletor" id="sel " defaultValue={0} className='border-2 rounded-2xl max-w-xs px-4 py-3 border-gray-100 text-[#123354] font-bold outline-none focus:border-[#123354]' onChange={(a)=>{const vector=a.target.value; setPecas(true);setEscolhaAero(Number(vector))}}>
            
                {aeronavesMocadas.map((aeronave,vetor)=> (<option value={vetor}>{aeronave.modelo}</option>))}
             </select>
             <div className='px-8'> 
                 {['TODOS', 'IMPORTADA', 'NACIONAL'].map((tipo) => (
                            <button
                                key={tipo}
                                onClick={() => setBusca(tipo)}
                                className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                    Busca === tipo 
                                    ? 'bg-[#123354] text-white shadow-md' 
                                    : 'text-gray-400 hover:text-[#123354]'
                                }`}
                            >
                                {tipo}
                            </button>
                        ))} </div>
                        
            </div>
           <PecasdeAeronaves aberto={Pecas}  aeronavePecas={aeronavesMocadas[EsolhaAero].pecas} buscaNome={BuscaNome.toLowerCase()} buscaT={Busca} />
           <FormCadastroPeca aberto={ModalCadastro} fechado={()=>setModalCadastro(false)}/>
                   
        
            </div>

    
    
    )
}

export default VerPecas