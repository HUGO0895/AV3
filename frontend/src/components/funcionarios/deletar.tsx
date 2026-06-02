import '../../index.css'

interface props {
    aberto: boolean;
    fechado: () => void;
    nome: string;
}

function ModalDeletarFuncionario({ aberto, fechado, nome }: props) {
    if (!aberto) return null

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[110] p-4">
            <div className="max-w-sm w-full bg-white rounded-3xl p-8 text-center shadow-2xl relative">
                <button onClick={fechado} className="absolute top-5 right-6 text-gray-400 hover:text-red-500 text-2xl font-bold">✕</button>

                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">!</div>
                <h2 className="text-xl font-bold text-[#123354] mb-2">Remover Acesso</h2>
                <p className="text-gray-500 mb-8 text-sm px-2">
                    Você tem certeza que deseja remover <strong>{nome}</strong> da equipe? Esta ação não pode ser desfeita.
                </p>

                <div className="flex gap-3">
                    <button onClick={fechado} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-all">Voltar</button>
                    <button className="flex-1 py-3 bg-red-600 rounded-xl font-bold text-white shadow-lg shadow-red-200 active:scale-95 transition-all">Remover</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDeletarFuncionario;