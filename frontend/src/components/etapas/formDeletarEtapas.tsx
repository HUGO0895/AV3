import { useState } from '../../index.css'
import EtapaServ from '../../service/EtapasService'

interface props {
  aberto: boolean;
  fechado: () => void;
  nomeEtapa: string;
  aeronave_id: string;
  onSalvar: () => void;
  onErro: (msg: string| null) => void;
}

function FormDeletarEtapa({ aberto, fechado, nomeEtapa, aeronave_id, onSalvar, onErro }: props) {
  if (!aberto) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-3xl shadow-2xl p-10 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#123354]">Remover Etapa</h2>
          <button onClick={fechado} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-bold">✕</button>
        </div>

        <div className="mb-8">
          <p className="text-gray-600">Você tem certeza que deseja remover a etapa abaixo do cronograma de produção?</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 uppercase mb-2">Etapa Selecionada</label>
            <input
              type="text"
              readOnly
              value={nomeEtapa}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-[#123354] font-bold outline-none cursor-default"
            />
          </div>

          <p className="text-sm text-gray-500 italic">* Atenção: Esta ação é irreversível.</p>

          <div className="flex gap-4 pt-2">
            <button type="button" onClick={fechado} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all">
              Cancelar
            </button>
            <button
              type="button"
              onClick={async () => {
                const resposta = await EtapaServ.delete([aeronave_id, nomeEtapa])
                if (resposta.status !== "sucess") {
                  onErro(resposta.resposta)
                  return
                }else{
                    onErro(null)
                }
                onSalvar()
                fechado()
              }}
              className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg active:scale-95"
            >
              Excluir Etapa
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormDeletarEtapa