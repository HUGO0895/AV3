import { useState } from 'react';
import '../../index.css';
import FormDeletarAero from './deletarAero';
import FormEditarAero from './formUpdate';
import FormCadastroAero from './formCdastro';

const aeronavesMocadas = [
    { id: 'AC-001', modelo: 'Boeing 737', tipo: 'COMERCIAL', alcance: 5000, capacidade: 180 },
    { id: 'AC-002', modelo: 'KC-390', tipo: 'MILITAR', alcance: 2800, capacidade: 80 },
    { id: 'AC-003', modelo: 'Airbus A320', tipo: 'COMERCIAL', alcance: 6100, capacidade: 150 },
    { id: 'AC-004', modelo: 'F-35 Lightning II', tipo: 'MILITAR', alcance: 2200, capacidade: 1 },
];

function VerAeronaves() {
  
    const [busca, setBusca] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('TODOS');

  
    const [ModalCadastro, setModalCadastro] = useState(false);
    const [ModalDelete, setModalDelete] = useState(false);
    const [idAero, setIdAero] = useState('');
    const [ModalEditar, setModalEditar] = useState(false);
    const [AeroParaEditar, setAeroParaEditar] = useState({ id: '', modelo: '', tipo: '', alcance: 0, capacidade: 0 });

    
    const aeronavesFiltradas = aeronavesMocadas.filter((aero) => {
        const bateNome = aero.modelo.toLowerCase().includes(busca.toLowerCase());
        const bateTipo = filtroTipo === 'TODOS' || aero.tipo === filtroTipo;
        return bateNome && bateTipo;
    });

    return (
        <div className="max-w-6xl w-full mx-auto  p-8 bg-white border border-gray-200 rounded-3xl shadow-sm flex flex-col gap-6">
            
            {/* --- CABEÇALHO --- */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>   
                <h1 className='font-bold text-2xl text-[#123354]'>Gestão de Frota</h1> 
                <button 
                    type='button' 
                    className='bg-[#123354] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#1a4a7a] transition-all active:scale-95 shadow-lg shadow-blue-900/10' 
                    onClick={() => setModalCadastro(true)}
                >
                    + Adicionar Aeronave
                </button>
            </div>

            {/* --- ÁREA DE FILTROS --- */}
            <div className="flex flex-col md:flex-row gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                {/* Input de Busca */}
                <div className="flex-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">Buscar Nome</label>
                    <input 
                        type="text"
                        placeholder="Ex: Boeing, Airbus..."
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-[#123354] transition-all font-medium"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>

                {/* Filtro de Tipo */}
                <div className="flex flex-col">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">Tipo de Operação</label>
                    <div className="flex bg-white p-1 border border-gray-200 rounded-xl">
                        {['TODOS', 'COMERCIAL', 'MILITAR'].map((tipo) => (
                            <button
                                key={tipo}
                                onClick={() => setFiltroTipo(tipo)}
                                className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                    filtroTipo === tipo 
                                    ? 'bg-[#123354] text-white shadow-md' 
                                    : 'text-gray-400 hover:text-[#123354]'
                                }`}
                            >
                                {tipo}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
          
            {/* --- LISTAGEM DE CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {aeronavesFiltradas.length > 0 ? (
                    aeronavesFiltradas.map((aero, index) => (
                        <div key={index} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 border-t-4 border-t-[#123354]">
                            
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                        aero.tipo === 'MILITAR' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                                    }`}>
                                        {aero.tipo}
                                    </span>
                                    <h3 className="text-xl font-bold text-[#123354] mt-1">{aero.modelo}</h3>
                                    <p className="text-[10px] text-gray-400 font-mono italic">{aero.id}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                                    <span className="text-[11px] font-bold text-gray-400 uppercase">Alcance</span>
                                    <span className="text-sm font-bold text-[#123354]">{aero.alcance.toLocaleString()} km</span>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                                    <span className="text-[11px] font-bold text-gray-400 uppercase">Capacidade</span>
                                    <span className="text-sm font-bold text-[#123354]">{aero.capacidade} Passageiros</span>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-2">
                                <button 
                                    className="flex-1 bg-[#123354] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-blue-900 transition-colors"
                                    onClick={() => { setModalEditar(true); setAeroParaEditar(aero); }}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="px-4 border border-red-100 text-red-400 py-2.5 rounded-xl font-bold text-xs hover:bg-red-50 hover:text-red-600 transition-all"
                                    onClick={() => { setModalDelete(true); setIdAero(aero.id); }}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold">Nenhuma aeronave encontrada com esses filtros.</p>
                    </div>
                )}
            </div>

            {/* --- MODAIS --- */}
            <FormCadastroAero aberto={ModalCadastro} fechado={() => setModalCadastro(false)} />
            <FormDeletarAero aberto={ModalDelete} nomeAero={idAero} fechado={() => setModalDelete(false)} />
            <FormEditarAero aberto={ModalEditar} aeronave={AeroParaEditar} fechado={() => setModalEditar(false)} />
        </div>
    );
}

export default VerAeronaves;