import { useState, useEffect } from "react";
import '../../index.css'

interface props {
    aberto: boolean;
    fechado: () => void;
    etapa: { 
        nome: string; 
        prazo: string; 
        status: string; 
        funcionarios: string[] 
    }
}

function FormEditarEtapa({ aberto, fechado, etapa }: props) {
    // Lista global de funcionários (mesma do cadastro)
    const funcionariosDisponiveis = ["Hugo", "Vitor Bomfim", "Mateus", "Ana", "Carlos"];
    
    // Estado inicializado com os funcionários que já estão na etapa
    const [selecionados, setSelecionados] = useState<string[]>(etapa.funcionarios);

    // Sincroniza o estado se a prop etapa mudar enquanto o componente estiver montado
    useEffect(() => {
        setSelecionados(etapa.funcionarios);
    }, [etapa]);

    if (!aberto) return null;

    const handleAddFuncionario = (nome: string) => {
        if (nome && !selecionados.includes(nome)) {
            setSelecionados([...selecionados, nome]);
        }
    };

    const handleRemoveFuncionario = (nome: string) => {
        setSelecionados(selecionados.filter(f => f !== nome));
    };

    return (
        <div className="fixed inset-0  flex items-center justify-center z-[60] p-4">
            
            <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 relative">
                
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#123354]">Editar Etapa de Produção</h2>
                    <button 
                        onClick={fechado}
                        className="text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold"
                    >
                        ✕
                    </button>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Nome da Etapa</label>
                        <input
                            type="text"
                            defaultValue={etapa.nome}
                            className="px-4 py-3 border border-gray-200 rounded-xl text-gray-700 outline-none focus:ring-2 focus:ring-[#123354] transition-all bg-gray-50 font-semibold"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Prazo de Entrega</label>
                        <input
                            type="date"
                            defaultValue={etapa.prazo}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none transition-all bg-gray-50"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Status Atual</label>
                        <select 
                            defaultValue={etapa.status} 
                            className='px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-semibold text-[#123354]'
                        >
                            <option value="PENDENTE">Pendente</option>
                            <option value="ANDAMENTO">Em Andamento</option>
                            <option value="CONCLUIDA">Concluída</option>
                        </select>
                    </div>

                    {/* MULTI-SELECT DE FUNCIONÁRIOS (IGUAL AO CADASTRO) */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Gerenciar Equipe</label>
                        
                        <select 
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-medium"
                            onChange={(e) => handleAddFuncionario(e.target.value)}
                            value=""
                        >
                            <option value="" disabled>Adicionar membro à equipe...</option>
                            {funcionariosDisponiveis.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>

                        {/* CONTAINER DE TAGS */}
                        <div className="flex flex-wrap gap-2 mt-3 p-3 min-h-[50px] border border-dashed border-gray-300 rounded-xl bg-gray-50">
                            {selecionados.length > 0 ? (
                                selecionados.map(f => (
                                    <span key={f} className="flex items-center gap-2 bg-[#123354] text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase animate-in fade-in zoom-in duration-200">
                                        {f}
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveFuncionario(f)}
                                            className="hover:text-red-400 transition-colors text-sm leading-none"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-gray-400 italic">Nenhum funcionário alocado.</span>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={fechado}
                            className="px-6 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-[#123354] text-white px-10 py-3 rounded-2xl font-bold hover:bg-[#1a4a7a] shadow-lg shadow-blue-900/20 transition-all active:scale-95"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormEditarEtapa