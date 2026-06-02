import '../../index.css'

function FormCadastroFuncionario({ aberto, fechado }: { aberto: boolean, fechado: () => void }) {
    if (!aberto) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="max-w-2xl w-full bg-white rounded-3xl p-8 relative shadow-2xl">
                
                {/* Botão de fechar no canto */}
                <button 
                    onClick={fechado} 
                    className="absolute top-5 right-6 text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-[#123354] mb-8">Novo Funcionário</h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    
                    {/* Nome Completo */}
                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
                        <input 
                            type="text" 
                            placeholder="Nome do colaborador"
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#123354] transition-all" 
                        />
                    </div>

                    {/* Usuário */}
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Usuário (Login)</label>
                        <input 
                            type="text" 
                            placeholder="ex: hugo.santos"
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#123354] transition-all font-semibold" 
                        />
                    </div>

                    {/* Senha */}
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Senha</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#123354] transition-all" 
                        />
                    </div>

                    {/* Telefone */}
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
                        <input 
                            type="text" 
                            placeholder="(12) 99999-9999"
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#123354] transition-all" 
                        />
                    </div>

                    {/* Nível de Permissão */}
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nível de Permissão</label>
                        <select className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#123354] font-bold text-[#123354]">
                            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                            <option value="ENGENHEIRO">ENGENHEIRO</option>
                            <option value="OPERADOR">OPERADOR</option>
                        </select>
                    </div>

                    {/* Endereço */}
                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Endereço Residencial</label>
                        <input 
                            type="text" 
                            placeholder="Rua, número, bairro e cidade"
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#123354] transition-all" 
                        />
                    </div>

                    {/* Botão de Envio */}
                    <button 
                        type="submit" 
                        className="md:col-span-2 bg-[#123354] text-white py-4 rounded-2xl font-bold mt-4 shadow-lg shadow-blue-900/20 hover:bg-[#1a4a7a] active:scale-[0.98] transition-all"
                    >
                        Cadastrar Funcionário
                    </button>

                </form>
            </div>
        </div>
    )
}

export default FormCadastroFuncionario;