import '../../index.css'

interface props {
    aberto: boolean;
    fechado: () => void;
}

function FormCadastroPeca({ aberto, fechado }: props) {
    if (!aberto) return null;

    return (
        /* Overlay centralizado com desfoque */
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            
            <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 relative">
                
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#123354]">Cadastrar Nova Peça</h2>
                    <button 
                        onClick={fechado}
                        className="text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold"
                    >
                        ✕
                    </button>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Nome do Componente */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Nome do Componente</label>
                        <input
                            type="text"
                            placeholder="Ex: Turbina CFM56"
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none transition-all bg-gray-50"
                        />
                    </div>

                    {/* Fornecedor */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Fornecedor</label>
                        <input
                            type="text"
                            placeholder="Ex: GE Aviation"
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none transition-all bg-gray-50"
                        />
                    </div>

                    {/* Tipo (Nacional ou Importada) */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Origem / Tipo</label>
                        <select 
                            className='px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-semibold text-[#123354]'
                        >
                            <option value="NACIONAL">NACIONAL</option>
                            <option value="IMPORTADA">IMPORTADA</option>
                        </select>
                    </div>

                    {/* Status do Fluxo de Produção */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Status da Peça</label>
                        <select 
                            className='px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-semibold text-[#123354]'
                        >
                            <option value="EM PRODUÇÃO">EM PRODUÇÃO</option>
                            <option value="EM TRANSPORTE">EM TRANSPORTE</option>
                            <option value="PRONTA">PRONTA</option>
                        </select>
                    </div>

                    {/* Botão de Ação */}
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
                            Cadastrar Peça
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormCadastroPeca