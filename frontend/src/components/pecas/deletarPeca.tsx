import { useState } from 'react'
import '../../index.css'
import PecaServ from '../../service/PecaService'

interface props {
  aberto: boolean
  fechado: () => void
  nomeAero: string
  aeronave_id: string
  onSalvar?: () => void
  onErro?: (msg: string) => void
}

function FormDeletarPeca({ aberto, fechado, nomeAero, aeronave_id, onSalvar, onErro }: props) {
  const [erro, setErro] = useState<string | null>(null)

  if (!aberto) return null

  return (
    <div className="max-w-xl mx-auto m-5 p-8 bg-white border border-gray-200 rounded-3xl shadow-sm fixed inset-70 justify-center flex items-center z-50 top-70">
      <div className='flex justify-between'>
        <div className="flex items-center gap-3 absolute top-8 left-12">
          <h2 className="text-2xl font-bold text-[#123354]">Deletar Peça</h2>
          {erro && (
            <span className="text-red-500 text-sm font-semibold bg-red-50 px-3 py-1 rounded-xl">
              {erro}
            </span>
          )}
        </div>
        <button onClick={fechado} className="absolute top-8 right-12 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10">X</button>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="flex flex-col md:col-span-2 lg:col-span-1">
          <label className="text-sm font-medium text-gray-700 mb-1">Nome da Peça</label>
          <input
            type="text"
            value={nomeAero}
            readOnly
            className="mr-10 w-50 px-4 py-2 border border-gray-300 rounded-xl outline-none bg-gray-50"
          />
        </div>

        <div className="lg:col-span-3 flex justify-start">
          <button
            type="button"
            onClick={async () => {
              const resposta = await PecaServ.delete([aeronave_id, nomeAero])
              if (resposta.status === "error") {
                setErro(resposta.resposta)
                onErro?.(resposta.resposta)
                return
              }
              onSalvar?.()
              fechado()
            }}
            className="ml-20 bg-red-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-red-700 transition-all shadow-sm"
          >
            Excluir Peça
          </button>
        </div>

        <div className="lg:col-span-4 mt-2">
          <p className="text-sm text-gray-500 italic">
            * Atenção: Esta ação é irreversível e removerá todos os dados da peça do sistema.
          </p>
        </div>
      </form>
    </div>
  )
}

export default FormDeletarPeca