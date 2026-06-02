import '../../index.css'

interface props {
    aberto: boolean;
    fechado: () => void;
    peca: { nome: string, status: string, fornecedor: string, tipo: string }
}

function FormEditarPeca({ aberto, fechado, peca }: props) {
    if (!aberto) return null

    return (
        /* Overlay com fundo escuro sólido, sem blur */
        <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
            
            <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 relative">
                
                {/* Cabeçalho */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#123354]">Editar Peça</h2>
                    <button 
                        onClick={fechado}
                        className="text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold"
                    >
                        ✕
                    </button>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Nome da Peça */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Nome do Componente</label>
                        <input
                            type="text"
                            defaultValue={peca.nome}
                            className="px-4 py-3 border border-gray-200 rounded-xl text-gray-700 outline-none focus:ring-2 focus:ring-[#123354] transition-all bg-gray-50 font-semibold"
                        />
                    </div>

                    {/* Fornecedor */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Fornecedor</label>
                        <input
                            type="text"
                            defaultValue={peca.fornecedor}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none transition-all bg-gray-50"
                        />
                    </div>

                    {/* Tipo */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Origem / Tipo</label>
                        <select 
                            defaultValue={peca.tipo}
                            className='px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-semibold text-[#123354]'
                        >
                            <option value="NACIONAL">NACIONAL</option>
                            <option value="IMPORTADA">IMPORTADA</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Status da Peça</label>
                        <select 
                            defaultValue={peca.status} 
                            className='px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-semibold text-[#123354]'
                        >
                            <option value="EM PRODUÇÃO">EM PRODUÇÃO</option>
                            <option value="EM TRANSPORTE">EM TRANSPORTE</option>
                            <option value="PRONTA">PRONTA</option>
                        </select>
                    </div>

                    {/* Botões */}
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
                            className="bg-[#123354] text-white px-10 py-3 rounded-2xl font-bold hover:bg-[#1a4a7a] shadow-lg transition-all active:scale-95"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormEditarPeca