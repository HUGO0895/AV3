import { useState } from 'react'
import '../../index.css'
import { createPeca } from '../../types/pecas'
import PecaServ from '../../service/PecaService'

interface props {
  aberto: boolean
  fechado: () => void
  onSalvar: () => void
  onErro: (msg: string) => void
  aeronave_id: string
}

function FormCadastroPeca({ aberto, fechado, onSalvar, onErro, aeronave_id }: props) {
  const [peca, setPeca] = useState<createPeca>({
    aeronave_id: aeronave_id,
    nome: '',
    tipo: 'NACIONAL',
    fornecedor: ''
  })
  const [erros, setErros] = useState<{ nome?: string, fornecedor?: string }>({})

  const mudanca = (campo: string, valor: unknown) => {
    setPeca(prev => ({ ...prev, [campo]: valor }))
    setErros(prev => ({ ...prev, [campo]: undefined }))
  }

  const validar = () => {
    const novosErros: { nome?: string, fornecedor?: string } = {}
    if (!peca.nome) novosErros.nome = "Nome obrigatório"
    if (!peca.fornecedor) novosErros.fornecedor = "Fornecedor obrigatório"
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  if (!aberto) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#123354]">Cadastrar Nova Peça</h2>
          <button onClick={fechado} className="text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold">✕</button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Nome do Componente</label>
            <input
              type="text"
              placeholder="Ex: Turbina CFM56"
              onChange={(e) => mudanca('nome', e.target.value)}
              className={`px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#123354] outline-none transition-all bg-gray-50 ${erros.nome ? 'border-red-400' : 'border-gray-200'}`}
            />
            {erros.nome && <span className="text-red-500 text-xs mt-1">{erros.nome}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Fornecedor</label>
            <input
              type="text"
              placeholder="Ex: GE Aviation"
              onChange={(e) => mudanca('fornecedor', e.target.value)}
              className={`px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#123354] outline-none transition-all bg-gray-50 ${erros.fornecedor ? 'border-red-400' : 'border-gray-200'}`}
            />
            {erros.fornecedor && <span className="text-red-500 text-xs mt-1">{erros.fornecedor}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Origem / Tipo</label>
            <select
              onChange={(e) => mudanca('tipo', e.target.value)}
              className='px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-semibold text-[#123354]'
            >
              <option value="NACIONAL">NACIONAL</option>
              <option value="IMPORTADA">IMPORTADA</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button type="button" onClick={fechado} className="px-6 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all">
              Cancelar
            </button>
            <button
              type="button"
              onClick={async () => {
                if (!validar()) return
                const pecaComAero = { ...peca, aeronave_id }
                const resposta = await PecaServ.create(pecaComAero)
                if (resposta.status === "error") {
                  onErro(resposta.resposta)
                  return
                }
                onSalvar()
                fechado()
              }}
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