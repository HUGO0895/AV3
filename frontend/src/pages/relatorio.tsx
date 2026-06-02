import { useState } from 'react';
import '../index.css';
import Navbar from '../components/navbar';
import { FileText, Plane, ClipboardCheck, Settings, User, Layers, Calendar, Building2 } from 'lucide-react';

const aeronavesComEtapas = [
    { 
        codigo: 'AC-013', 
        modelo: 'Boeing 777X', 
        tipo: 'COMERCIAL' as const, 
        capacidade: 426, 
        alcance: 13500, 
        pecas: [
            { nome: 'Atuador de Ponta de Asa', status: 'PRONTA' as const, tipo: 'AERODINÂMICO' as const }
        ],
        etapas: [
            { nome: 'Montagem de Dobradiça', status: 'CONCLUIDA' as const, funcionarios: ['Hugo', 'Vitor'] },
            { nome: 'Instalação Hidráulica', status: 'CONCLUIDA' as const, funcionarios: ['Mateus'] }
        ],
        testes: [
            { tipo: 'AERODINÂMICO' as const, resultado: 'APROVADO' as const, responsavel: 'Vitor Bomfim' },
            { tipo: 'HIDRÁULICO' as const, resultado: 'REPROVADO' as const, responsavel: 'Mateus' }
        ]
    }, // For
    { 
        codigo: 'AC-014', 
        modelo: 'Gripen NG', 
        tipo: 'MILITAR' as const, 
        capacidade: 1,
        alcance: 4000,
        pecas: [
            { nome: 'Fly-by-wire Unit', status: 'PRONTA' as const, tipo: 'ELÉTRICO' as const }
        ],
        etapas: [
            { nome: 'Update de Firmware', status: 'CONCLUIDA' as const, funcionarios: ['Mateus'] },
            { nome: 'Calibração de Sensores', status: 'CONCLUIDA' as const, funcionarios: ['Hugo'] }
        ],
        testes: [
            { tipo: 'ELÉTRICO' as const, resultado: 'APROVADO' as const, responsavel: 'Hugo' },
            { tipo: 'AERODINÂMICO' as const, resultado: 'APROVADO' as const, responsavel: 'Vitor Bomfim' }
        ]
    }
];

function Relatorios() {
    const [modeloId, setModeloId] = useState(0);
    const [cliente, setCliente] = useState('');
    const [prazo, setPrazo] = useState('');

    const aero = aeronavesComEtapas[modeloId];

    return (
        <div className="min-h-screen pb-10 bg-gray-50">
            <Navbar />
            
            <main className="max-w-6xl mx-auto mt-4 p-4">
                {/* Header de Filtros e Inputs */}
                <div  className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div>
                        <div className="flex items-center gap-2 text-[#123354] mb-1">
                            <FileText size={20} />
                            <span className="font-bold tracking-widest text-sm uppercase">Sistema de Engenharia</span>
                        </div>
                        <h1 className="text-4xl font-black text-[#123354] tracking-tight">Relatório Técnico</h1>
                        <p className="text-gray-500 mt-2 font-medium">Configure os dados de exportação</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        
                        {/* Input Cliente */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Cliente</label>
                            <div className="relative">
                                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text"
                                    placeholder="Ex: Embraer"
                                    className="bg-gray-50 border-2 border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-[#123354] font-bold focus:border-[#123354] outline-none transition-all shadow-inner min-w-[200px]"
                                    value={cliente}
                                    onChange={(e) => setCliente(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Input Prazo */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Prazo Final</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="date"
                                    className="bg-gray-50 border-2 border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-[#123354] font-bold focus:border-[#123354] outline-none transition-all shadow-inner"
                                    value={prazo}
                                    onChange={(e) => setPrazo(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Select Aeronave */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Modelo</label>
                            <select 
                                className="appearance-none bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-3 pr-12 text-[#123354] font-bold focus:border-[#123354] outline-none transition-all cursor-pointer shadow-inner"
                                onChange={(e) => setModeloId(Number(e.target.value))}
                            >
                                {aeronavesComEtapas.map((aero, pos) => (
                                    <option key={aero.codigo} value={pos}>{aero.modelo}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Card do Relatório */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        
                        {/* Sidebar do Card */}
                        <div className="lg:col-span-4 bg-[#123354] p-10 text-white flex flex-col justify-between">
                            <div>
                                <div className="bg-blue-400/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                    <Plane size={32} />
                                </div>
                                <h2 className="text-3xl font-bold mb-6">{aero.modelo}</h2>
                                
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Matrícula (Código)</p>
                                        <p className="text-xl font-mono bg-white/10 inline-block px-3 py-1 rounded-lg italic">{aero.codigo}</p>
                                    </div>
                                    
                                    {/* Exibição Dinâmica do Cliente e Prazo */}
                                    {cliente && (
                                        <div>
                                            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Cliente Solicitante</p>
                                            <p className="text-lg font-semibold uppercase">{cliente}</p>
                                        </div>
                                    )}

                                    {prazo && (
                                        <div>
                                            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Data Limite</p>
                                            <p className="text-lg font-semibold">{new Date(prazo).toLocaleDateString('pt-BR')}</p>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-white/10 space-y-4">
                                        <div>
                                            <p className="text-blue-200 text-[10px] font-bold uppercase mb-1">Capacidade</p>
                                            <p className="text-md font-medium">{aero.capacidade} Assentos</p>
                                        </div>
                                        <div>
                                            <p className="text-blue-200 text-[10px] font-bold uppercase mb-1">Alcance</p>
                                            <p className="text-md font-medium">{aero.alcance} km</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-12 bg-white text-[#123354] py-4 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2">
                                <FileText size={20} />
                                GERAR PDF
                            </button>
                        </div>

                        {/* Conteúdo Principal do Card */}
                        <div className="lg:col-span-8 p-10">
                            <div className="grid gap-10">
                                
                                <section>
                                    <h3 className="flex items-center gap-2 text-[#123354] font-bold text-xl mb-4 border-b pb-2">
                                        <Settings size={20} /> Peças Registradas
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {aero.pecas.map((p, i) => (
                                            <div key={i} className="flex flex-col bg-gray-50 p-4 rounded-2xl border border-gray-100 min-w-[200px]">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{p.tipo}</span>
                                                <span className="text-[#123354] font-bold">{p.nome}</span>
                                                <span className="text-[10px] mt-2 font-bold text-green-600 bg-green-50 self-start px-2 py-0.5 rounded-md italic">{p.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 className="flex items-center gap-2 text-[#123354] font-bold text-xl mb-4 border-b pb-2">
                                        <Layers size={20} /> Etapas de Produção e Responsáveis
                                    </h3>
                                    <div className="space-y-3">
                                        {aero.etapas.map((etapa, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-blue-50/30 rounded-2xl border border-blue-100/50">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-[#123354] text-white flex items-center justify-center font-bold text-xs">
                                                        {i + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-[#123354]">{etapa.nome}</h4>
                                                        <div className="flex items-center gap-1 text-gray-500">
                                                            <User size={12} />
                                                            <p className="text-xs font-medium">Equipe: {etapa.funcionarios.join(', ')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-black bg-white text-[#123354] px-3 py-1 rounded-full shadow-sm border border-blue-100">
                                                    {etapa.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 className="flex items-center gap-2 text-[#123354] font-bold text-xl mb-4 border-b pb-2">
                                        <ClipboardCheck size={20} /> Controle de Qualidade (Testes)
                                    </h3>
                                    <div className="overflow-hidden border border-gray-100 rounded-2xl">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                                                    <th className="px-6 py-4">Tipo de Teste</th>
                                                    <th className="px-6 py-4">Inspetor Responsável</th>
                                                    <th className="px-6 py-4 text-right">Resultado Final</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {aero.testes.map((teste, i) => (
                                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="px-6 py-4 font-bold text-[#123354]">{teste.tipo}</td>
                                                        <td className="px-6 py-4 text-gray-500 font-medium text-sm italic">{teste.responsavel}</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest ${
                                                                teste.resultado === 'APROVADO' 
                                                                ? 'bg-green-100 text-green-600 border border-green-200' 
                                                                : 'bg-red-100 text-red-600 border border-red-200'
                                                            }`}>
                                                                {teste.resultado}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Relatorios;