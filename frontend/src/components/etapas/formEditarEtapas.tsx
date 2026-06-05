import { useState, useEffect } from "react";
import '../../index.css'
import EtapaServ from '../../service/EtapasService'
import FuncServ from '../../service/FuncService'
import { responseEtapa, updateEtapa } from '../../types/etapas'
 
interface props {
  aberto: boolean;
  fechado: () => void;
  etapa: responseEtapa;
  onSalvar: () => void;
  onErro: (msg: string| null) => void;
}
 
function FormEditarEtapa({ aberto, fechado, etapa, onSalvar, onErro }: props) {
  const [funcionariosDisponiveis, setFuncionariosDisponiveis] = useState<{ id: number, usuario: string }[]>([])
  const [selecionados, setSelecionados] = useState<number[]>([])
  const [Etapa, setEtapa] = useState<updateEtapa>({
    nome: etapa.nome,
    prazo: etapa.prazo,
    status: etapa.status,
    aeronave_id: etapa.aeronave_id,
    funcionarios: []
  })
 
  useEffect(() => {
  const buscarFuncs = async () => {
    const resposta = await FuncServ.get(undefined)
    const disponiveis = resposta.resposta
    setFuncionariosDisponiveis(disponiveis)

    // etapa.funcionarios é { funcionario: { usuario: string, id: number } }[]
    const usuariosAlocados = (etapa.funcionarios ?? []).map((f: any) => f.funcionario.usuario)

    const preCarregados = disponiveis
      .filter((f: { id: number, usuario: string }) => usuariosAlocados.includes(f.usuario))
      .map((f: { id: number, usuario: string }) => f.id)

    setSelecionados(preCarregados)
  }
  buscarFuncs()
}, [etapa.nome, etapa.aeronave_id]) // primitivos, sem loop
  const mudanca = (campo: string, valor: unknown) => {
    setEtapa(prev => ({ ...prev, [campo]: valor }))
  }
 
  const handleAddFuncionario = (id: number) => {
    if (!selecionados.includes(id)) setSelecionados([...selecionados, id])
  }
 
  const handleRemoveFuncionario = (id: number) => {
    setSelecionados(selecionados.filter(f => f !== id))
  }
 console.log("funcionarios da etapa:", etapa.funcionarios)
console.log("disponiveis:", funcionariosDisponiveis)
  if (!aberto) return null;
 
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#123354]">Editar Etapa de Produção</h2>
          <button onClick={fechado} className="text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold">✕</button>
        </div>
 
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Nome da Etapa</label>
            <input
              type="text"
              defaultValue={etapa.nome}
              disabled
              className="px-4 py-3 border border-gray-200 rounded-xl text-gray-400 outline-none bg-gray-50 font-semibold"
            />
          </div>
 
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Prazo de Entrega</label>
            <input
              type="date"
              defaultValue={etapa.prazo}
              onChange={(e) => mudanca('prazo', e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none transition-all bg-gray-50"
            />
          </div>
 
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Status Atual</label>
            <select
              defaultValue={etapa.status}
              onChange={(e) => mudanca('status', e.target.value)}
              className='px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-semibold text-[#123354]'
            >
              <option value="PENDENTE">Pendente</option>
              <option value="ANDAMENTO">Em Andamento</option>
              <option value="CONCLUIDA">Concluída</option>
            </select>
          </div>
 
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Gerenciar Equipe</label>
            <select
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-gray-50 font-medium"
              onChange={(e) => handleAddFuncionario(Number(e.target.value))}
              value=""
            >
              <option value="" disabled>Adicionar membro à equipe...</option>
              {funcionariosDisponiveis.map(f => (
                <option key={f.id} value={f.id}>{f.usuario}</option>
              ))}
            </select>
 
            <div className="flex flex-wrap gap-2 mt-3 p-3 min-h-[50px] border border-dashed border-gray-300 rounded-xl bg-gray-50">
              {selecionados.length > 0 ? (
                selecionados.map(id => {
                  const func = funcionariosDisponiveis.find(f => f.id === id)
                  return (
                    <span key={id} className="flex items-center gap-2 bg-[#123354] text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                      {func?.usuario}
                      <button type="button" onClick={() => handleRemoveFuncionario(id)} className="hover:text-red-400 transition-colors">✕</button>
                    </span>
                  )
                })
              ) : (
                <span className="text-xs text-gray-400 italic">Nenhum funcionário alocado.</span>
              )}
            </div>
          </div>
 
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button type="button" onClick={fechado} className="px-6 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all">
              Cancelar
            </button>
            <button
              type="button"
              onClick={async () => {
                const etapaAtualizada = { ...Etapa, funcionarios: selecionados }
                const resposta = await EtapaServ.update(etapaAtualizada)
                if (resposta.status !== "sucess") {
                  onErro(resposta.resposta)
                   fechado()
                }else{
                    onErro(null)
                }
                onSalvar()
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
 
export default FormEditarEtapa
