import { useState } from 'react'
import '../../index.css'
import FormDeletarPeca from './deletarPeca'
import FormEditarPeca from './formEditarPeca'
import { ResponsePeca } from '../../types/pecas'

interface props {
  aberto: boolean
  aeronavePecas: Array<ResponsePeca>
  buscaT: string
  buscaNome: string
  onSalvar: () => void
  onErro: (msg: string) => void
}

function PecasdeAeronaves({ aberto, aeronavePecas, buscaNome, buscaT, onSalvar, onErro }: props) {
  const [ModalDelete, setModalDelete] = useState(false)
  const [nomePeca, setNomePeca] = useState('')
  const [ModalEditar, setModalEditar] = useState(false)
  const [Peca, setPeca] = useState<ResponsePeca | undefined>(undefined)

  const PecasFiltro = aeronavePecas.filter((peca) => {
    const Batetipo = buscaT.toUpperCase() === "TODOS" || peca.tipo === buscaT.toUpperCase()
    const BateNome = buscaNome === '' || peca.nome.toLowerCase().includes(buscaNome)
    return BateNome && Batetipo
  })

  if (!aberto) return null

  return (
    <div>
      {PecasFiltro.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {PecasFiltro.map((peca, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <div className="border-b border-gray-100 pb-3 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{peca.tipo}</span>
                  <h3 className="text-2xl font-bold text-[#123354]">{peca.nome}</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                  <span className="text-sm text-gray-500">Fornecedor</span>
                  <span className="text-sm font-semibold text-gray-800">{peca.fornecedor}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="px-3 py-1 rounded-full bg-white text-[11px] font-bold text-[#123354] border border-gray-200 shadow-sm uppercase">
                    {peca.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="flex-1 bg-[#123354] text-white py-2 rounded-xl font-bold text-sm hover:bg-blue-900 transition-colors"
                  onClick={() => { setModalEditar(true); setPeca(peca) }}
                >
                  Editar
                </button>
                <button
                  className="flex-1 border border-red-200 text-red-500 py-2 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors"
                  onClick={() => { setModalDelete(true); setNomePeca(peca.nome); setPeca(peca) }}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-bold">Nenhuma peça encontrada.</p>
        </div>
      )}

      <FormDeletarPeca
        aberto={ModalDelete}
        nomeAero={nomePeca}
        aeronave_id={Peca?.aeronave_id ?? ''}
        fechado={() => setModalDelete(false)}
        onSalvar={onSalvar}
        onErro={onErro}
      />
   {ModalEditar && (
  <FormEditarPeca
    key={Peca?.nome}
    aberto={ModalEditar}
    peca={Peca!}
    fechado={() => setModalEditar(false)}
    onSalvar={onSalvar}
    onErro={onErro}
  />
)}
    </div>
  )
}

export default PecasdeAeronaves