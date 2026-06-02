import { useState } from 'react';
import FormEditarEtapa from './formEditarEtapas'; // Ajuste o caminho conforme sua pasta
import FormDeletarEtapa from './formDeletarEtapas'; // Ajuste o caminho conforme sua pasta

interface EtapaProps {
    aberto: boolean;
    etapas: Array<{ nome: string, prazo: string, status: string, funcionarios: string[] }>;
}

function EtapasDaAeronave({ aberto, etapas }: EtapaProps) {
    // Estados para controle dos Modais
    const [modalEditar, setModalEditar] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);
    
    // Estado para armazenar a etapa que foi clicada
    const [etapaSelecionada, setEtapaSelecionada] = useState({
        nome: '',
        prazo: '',
        status: '',
        funcionarios: [] as string[]
    });

    if (!aberto) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONCLUIDA': return 'bg-green-100 text-green-700 border-green-200';
            case 'ANDAMENTO': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {etapas.map((etapa, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4 border-l-8 border-l-[#123354]">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-[#123354]">{etapa.nome}</h3>
                                <p className="text-sm text-gray-500 font-medium">Prazo: {etapa.prazo}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(etapa.status)}`}>
                                {etapa.status}
                            </span>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Equipe Alocada</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {etapa.funcionarios.length > 0 ? (
                                    etapa.funcionarios.map((func, i) => (
                                        <span key={i} className="bg-white px-3 py-1 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600">
                                            {func}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-400 italic">Nenhum funcionário atribuído</span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button 
                                className="flex-1 py-2 bg-gray-100 text-[#123354] rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
                                onClick={() => {
                                    setEtapaSelecionada(etapa);
                                    setModalEditar(true);
                                }}
                            >
                                Editar
                            </button>
                            <button 
                                className="flex-1 py-2 border border-red-100 text-red-500 rounded-xl font-bold text-sm hover:bg-red-50 transition-all"
                                onClick={() => {
                                    setEtapaSelecionada(etapa);
                                    setModalDeletar(true);
                                }}
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modais colocados fora do Loop Map para performance */}
            <FormEditarEtapa 
                aberto={modalEditar} 
                fechado={() => setModalEditar(false)} 
                etapa={etapaSelecionada} 
            />

            <FormDeletarEtapa 
                aberto={modalDeletar} 
                fechado={() => setModalDeletar(false)} 
                nomeEtapa={etapaSelecionada.nome} 
            />
        </>
    );
}

export default EtapasDaAeronave;