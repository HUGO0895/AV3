import { useEffect, useState } from "react";
import '../../index.css'
import EtapaServ from '../../service/EtapasService'
import FuncServ from '../../service/FuncService'
import { createEtapa } from '../../types/etapas'

interface props {
  aberto: boolean;
  fechado: () => void;
  onSalvar: () => void;
  onErro: (msg: string) => void;
  aeronave_id: string;
}

function FormCadastroEtapa({ aberto, fechado, onSalvar, onErro, aeronave_id }: props) {
  const [funcionariosDisponiveis, setFuncionariosDisponiveis] = useState<{ id: number, usuario: string }[]>([])
  const [selecionados, setSelecionados] = useState<number[]>([])
  const [etapa, setEtapa] = useState<createEtapa>({
    nome: '',
    prazo: '',
    aeronave_id: aeronave_id,
    funcionarios: []
  })
  const [erros, setErros] = useState<{ nome?: string, prazo?: string }>({})

  useEffect(() => {
    const buscarFuncs = async () => {
      const resposta = await FuncServ.get(undefined)
      setFuncionariosDisponiveis(resposta.resposta)
    }
    buscarFuncs()
  }, [])

  const mudanca = (campo: string, valor: unknown) => {
    setEtapa(prev => ({ ...prev, [campo]: valor }))
    setErros(prev => ({ ...prev, [campo]: undefined }))
  }

  const validar = () => {
    const novosErros: { nome?: string, prazo?: string } = {}
    if (!etapa.nome) novosErros.nome = "Nome obrigatório"
    if (!etapa.prazo) novosErros.prazo = "Prazo obrigatório"
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleAddFuncionario = (id: number) => {
    if (!selecionados.includes(id)) {
      setSelecionados([...selecionados, id])
    }
  }

  const handleRemoveFuncionario = (id: number) => {
    setSelecionados(selecionados.filter(f => f !== id))
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#123354]">Cadastrar Nova Etapa</h2>
          <button onClick={fechado} className="text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold">✕</button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Nome da Etapa</label>
            <input
              type="text"
              placeholder="Ex: Montagem da Fuselagem"
              onChange={(e) => mudanca('nome', e.target.value)}
              className={`px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#123354] bg-gray-50 ${erros.nome ? 'border-red-400' : 'border-gray-200'}`}
            />
            {erros.nome && <span className="text-red-500 text-xs mt-1">{erros.nome}</span>}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Prazo Final</label>
            <input
              type="date"
              onChange={(e) => mudanca('prazo', e.target.value)}
              className={`px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 text-gray-700 ${erros.prazo ? 'border-red-400' : 'border-gray-200'}`}
            />
            {erros.prazo && <span className="text-red-500 text-xs mt-1">{erros.prazo}</span>}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Alocar Equipe</label>
            <select
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-medium"
              onChange={(e) => handleAddFuncionario(Number(e.target.value))}
              value=""
            >
              <option value="" disabled>Selecione os funcionários...</option>
              {funcionariosDisponiveis.map(f => (
                <option key={f.id} value={f.id}>{f.usuario}</option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2 mt-3 p-3 min-h-[50px] border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              {selecionados.length > 0 ? (
                selecionados.map(id => {
                  const func = funcionariosDisponiveis.find(f => f.id === id)
                  return (
                    <span key={id} className="flex items-center gap-2 bg-[#123354] text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                      {func?.usuario}
                      <button type="button" onClick={() => handleRemoveFuncionario(id)} className="hover:text-red-400 transition-colors">×</button>
                    </span>
                  )
                })
              ) : (
                <span className="text-xs text-gray-400 italic">Nenhum funcionário selecionado.</span>
              )}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="button"
              onClick={async () => {
                if (!validar()) return
                const etapaComAero = { ...etapa, aeronave_id, funcionarios: selecionados }
                const resposta = await EtapaServ.create(etapaComAero)
                if (resposta.status !== "sucess") {
                  onErro(resposta.resposta)
                  return
                }
                onSalvar()
                fechado()
              }}
              className="w-full md:w-auto bg-[#123354] text-white px-12 py-3 rounded-2xl font-bold hover:bg-[#1a4a7a] shadow-lg transition-all active:scale-95"
            >
              Criar Etapa
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormCadastroEtapa;