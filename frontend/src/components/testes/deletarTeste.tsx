import '../../index.css';

// Interface ajustada para usar a tipagem estrita do sistema Aerocode
interface DeletarTesteProps {
    aberto: boolean;
    fechado: () => void;
    // Define que o tipo de teste deve ser um dos três permitidos na AV1
    tipoTeste: 'ELETRICO' | 'HIDRAULICO' | 'AERODINAMICO' | string; 
}

function FormDeletarTeste({ aberto, fechado, tipoTeste }: DeletarTesteProps) {
    if (!aberto) return null;

    return (
        /* Overlay com fundo escuro sólido, sem blur */
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[110] p-4">
            
            <div className="max-w-sm w-full bg-white rounded-3xl p-8 text-center shadow-2xl relative">
                
                {/* Botão X no canto superior direito */}
                <button 
                    onClick={fechado}
                    className="absolute top-5 right-6 text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold"
                >
                    ✕
                </button>

                {/* Ícone de Alerta */}
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                    !
                </div>

                <h2 className="text-xl font-bold text-[#123354] mb-2">Excluir Relatório</h2>
                
                <p className="text-gray-500 mb-8 text-sm px-2">
                    Tem certeza que deseja apagar o registro de <strong>TESTE {tipoTeste}</strong> permanentemente?
                </p>

                <div className="flex gap-3">
                    <button 
                        onClick={fechado} 
                        className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-all"
                    >
                        Voltar
                    </button>
                    <button 
                        className="flex-1 py-3 bg-red-600 rounded-xl font-bold text-white shadow-lg shadow-red-200 active:scale-95 transition-all"
                    >
                        Confirmar Exclusão
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormDeletarTeste;