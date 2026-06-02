import '../../index.css'

interface props {
    aberto: boolean;
    fechado: () => void;
    funcionario: { nome: string, usuario: string, nivelPermissao: string, telefone: string, endereco: string }
}

function ModalVerFuncionario({ aberto, fechado, funcionario }: props) {
    if (!aberto) return null

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl shadow-2xl p-10 relative">
                <button onClick={fechado} className="absolute top-5 right-6 text-gray-400 hover:text-red-500 text-2xl font-bold">✕</button>

                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-[#123354] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold uppercase">
                        {funcionario.nome.charAt(0)}
                    </div>
                    <h2 className="text-2xl font-bold text-[#123354]">{funcionario.nome}</h2>
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">{funcionario.nivelPermissao}</span>
                </div>

                <div className="space-y-4 border-t border-gray-100 pt-6">
                    <div className="flex justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase">Usuário</span>
                        <span className="text-sm font-semibold text-[#123354]">@{funcionario.usuario}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase">Telefone</span>
                        <span className="text-sm font-semibold text-[#123354]">{funcionario.telefone}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-gray-400 uppercase">Endereço</span>
                        <span className="text-sm font-semibold text-[#123354]">{funcionario.endereco}</span>
                    </div>
                </div>

                <button onClick={fechado} className="w-full mt-8 py-3 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all">
                    Fechar Detalhes
                </button>
            </div>
        </div>
    )
}

export default ModalVerFuncionario;