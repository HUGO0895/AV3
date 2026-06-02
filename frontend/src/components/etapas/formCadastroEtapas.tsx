import { useState } from "react";
import '../../index.css'

interface props {
    aberto: boolean;
    fechado: () => void;
}

function FormCadastroEtapa({ aberto, fechado }: props) {
    // Lista de funcionários do sistema (Isso poderia vir de uma API/Banco)
    const funcionariosDisponiveis = ["Hugo", "Vitor Bomfim", "Mateus", "Ana", "Carlos"];
    
    // Estado para armazenar os selecionados
    const [selecionados, setSelecionados] = useState<string[]>([]);

    if (!aberto) return null;

    // Função para adicionar funcionário sem repetir
    const handleAddFuncionario = (nome: string) => {
        if (nome && !selecionados.includes(nome)) {
            setSelecionados([...selecionados, nome]);
        }
    };

    // Função para remover funcionário da lista
    const handleRemoveFuncionario = (nome: string) => {
        setSelecionados(selecionados.filter(f => f !== nome));
    };

    return (
        <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
            <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 relative">
                
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#123354]">Cadastrar Nova Etapa</h2>
                    <button onClick={fechado} className="text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold">✕</button>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Nome da Etapa</label>
                        <input type="text" placeholder="Ex: Montagem da Fuselagem" className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#123354] bg-gray-50" />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Prazo Final</label>
                        <input type="date" className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 text-gray-700" />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Status Inicial</label>
                        <select className='px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-semibold text-[#123354]'>
                            <option value="PENDENTE">Pendente</option>
                            <option value="ANDAMENTO">Em Andamento</option>
                            <option value="CONCLUIDA">Concluída</option>
                        </select>
                    </div>

                    {/* MULTI-SELECT DE FUNCIONÁRIOS */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Alocar Equipe</label>
                        
                        <select 
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-medium"
                            onChange={(e) => handleAddFuncionario(e.target.value)}
                            value=""
                        >
                            <option value="" disabled>Selecione os funcionários...</option>
                            {funcionariosDisponiveis.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>

                        {/* CONTAINER DE TAGS (Badges) */}
                        <div className="flex flex-wrap gap-2 mt-3 p-3 min-h-[50px] border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                            {selecionados.length > 0 ? (
                                selecionados.map(f => (
                                    <span key={f} className="flex items-center gap-2 bg-[#123354] text-white px-3 py-1.5 rounded-lg text-xs font-bold animate-in fade-in zoom-in duration-200">
                                        {f}
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveFuncionario(f)}
                                            className="hover:text-red-400 transition-colors text-sm leading-none"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-gray-400 italic">Nenhum funcionário selecionado.</span>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end mt-4">
                        <button type="submit" className="w-full md:w-auto bg-[#123354] text-white px-12 py-3 rounded-2xl font-bold hover:bg-[#1a4a7a] shadow-lg transition-all active:scale-95">
                            Criar Etapa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormCadastroEtapa;