import { useState } from 'react'
import '../../index.css'
import { ResponsePeca, updatePeca } from '../../types/pecas'
import PecaServ from '../../service/PecaService'

interface props {
    aberto: boolean
    fechado: () => void
    peca: ResponsePeca
    onSalvar?: () => void
    onErro?: (msg: string| null) => void
}

function FormEditarPeca({ aberto, fechado, peca, onSalvar, onErro }: props) {
    const [Peca, setPeca] = useState<updatePeca>({
        aeronave_id: peca.aeronave_id,
        nome: peca.nome,
        tipo: peca.tipo,
        fornecedor: peca.fornecedor,
        status: peca.status
    })
    const [erro, setErro] = useState<string | null>(null)

    const mudanca = (campo: string, valor: unknown) => {
        setPeca(prev => ({ ...prev, [campo]: valor }))
    }

    if (!aberto) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
            <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 relative">
                
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-[#123354]">Editar Peça</h2>
                        {erro && (
                            <span className="text-red-500 text-sm font-semibold bg-red-50 px-3 py-1 rounded-xl">
                                {erro}
                            </span>
                        )}
                    </div>
                    <button onClick={fechado} className="text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold">✕</button>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Nome do Componente</label>
                        <input
                            type="text"
                            defaultValue={peca.nome}
                            disabled
                            className="px-4 py-3 border border-gray-200 rounded-xl text-gray-400 outline-none bg-gray-50 font-semibold"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Fornecedor</label>
                        <input
                            type="text"
                            defaultValue={peca.fornecedor}
                            onChange={(e) => mudanca('fornecedor', e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none transition-all bg-gray-50"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Origem / Tipo</label>
                        <select
                            defaultValue={peca.tipo}
                            onChange={(e) => mudanca('tipo', e.target.value)}
                            className='px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-semibold text-[#123354]'
                        >
                            <option value="NACIONAL">NACIONAL</option>
                            <option value="IMPORTADA">IMPORTADA</option>
                        </select>
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Status da Peça</label>
                        <select
                            defaultValue={peca.status}
                            onChange={(e) => mudanca('status', e.target.value)}
                            className='px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-semibold text-[#123354]'
                        >
                            <option value="EM_PRODUCAO">EM PRODUÇÃO</option>
                            <option value="EM_TRANSPORTE">EM TRANSPORTE</option>
                            <option value="PRONTA">PRONTA</option>
                        </select>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                        <button type="button" onClick={fechado} className="px-6 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all">
                            Cancelar
                        </button>
                        <button
                            type="button"
                          onClick={async () => {
  const resposta = await PecaServ.update(Peca)
  if (resposta.status !== "sucess") {onErro?.(resposta.resposta)}
  else {
    onErro?.(null)
  }

  onSalvar?.()
  fechado()
}}
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