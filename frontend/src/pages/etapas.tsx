import { useEffect, useState } from 'react';
import '../index.css';
import EtapasDaAeronave from '../components/etapas/etapasAeronave';
import Navbar from '../components/navbar';
import FormCadastroEtapa from '../components/etapas/formCadastroEtapas';
import AeroServ from '../service/AeronaveService';
import EtapaServ from '../service/EtapasService';
import { ResponseAero } from '../types/aeronave';
import { responseEtapa } from '../types/etapas';

function VerEtapas() {
  const [aeronaves, setAeronaves] = useState<ResponseAero[]>([])
  const [etapas, setEtapas] = useState<responseEtapa[]>([])
  const [aeronaveSelecionada, setAeronaveSelecionada] = useState<ResponseAero | undefined>(undefined)
  const [modalCadastro, setModalCadastro] = useState(false)
  const [BuscaNome, setBuscaNome] = useState('')
  const [Status, setStatus] = useState("TODOS")
  const [erro, setErro] = useState<string | null>(null)

  const buscarAeronaves = async () => {
    const resposta = await AeroServ.get(undefined)
    setAeronaves(resposta.resposta)
  }

  const buscarEtapas = async (id: string) => {
    const resposta = await EtapaServ.get(id)
    setEtapas(resposta.resposta)
  }

  const reloadEtapas = () => {
    if (aeronaveSelecionada) buscarEtapas(aeronaveSelecionada.id)
  }

  useEffect(() => {
    buscarAeronaves()
    const intervalo = setInterval(() => { buscarAeronaves() }, 10000)
    return () => clearInterval(intervalo)
  }, [])

  const etapasFiltro = etapas.filter((etapa) => {
    const BateNome = BuscaNome === '' || etapa.nome.toLowerCase().includes(BuscaNome.toLowerCase())
    const BateStatus = Status.toLowerCase() === 'todos' || etapa.status.toLowerCase() === Status.toLowerCase()
    return BateNome && BateStatus
  })

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl w-full mx-auto m-5 p-8 bg-white border border-gray-200 rounded-3xl shadow-sm flex flex-col gap-6">

        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-xl text-[#123354]'>Fluxo de Etapas</h1>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">Buscar Nome</label>
            <input
              type="text"
              placeholder="Ex: Montagem"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-[#123354] transition-all font-medium"
              value={BuscaNome}
              onChange={(e) => setBuscaNome(e.target.value)}
            />
          </div>
          <button
            type='button'
            className='bg-[#123354] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#1a4a7a] transition-all active:scale-95'
            onClick={() => { setModalCadastro(true); setErro(null) }}
          >
            Nova Etapa
          </button>
        </div>

        <div className='flex justify-between items-center'>
          <div className="flex items-center gap-3">
            <select
              className='border-2 rounded-2xl max-w-xs px-4 py-3 border-gray-100 text-[#123354] font-bold outline-none focus:border-[#123354]'
              onChange={(e) => {
                if (!e.target.value) return
                const aeronave = JSON.parse(e.target.value)
                setAeronaveSelecionada(aeronave)
                buscarEtapas(aeronave.id)
                setErro(null)
              }}
            >
              <option value="">Selecione uma aeronave</option>
              {aeronaves.map((aero) => (
                <option key={aero.id} value={JSON.stringify(aero)}>{aero.id}</option>
              ))}
            </select>
            {erro && (
              <span className="text-red-500 text-sm font-semibold bg-red-50 px-3 py-1 rounded-xl">
                {erro}
              </span>
            )}
          </div>

          <div className='px-8'>
            {["TODOS", "ANDAMENTO", "PENDENTE", "CONCLUIDA"].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setStatus(tipo)}
                className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${Status.toLowerCase() === tipo.toLowerCase() ? 'bg-[#123354] text-white shadow-md' : 'text-gray-400 hover:text-[#123354]'}`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>

        {aeronaveSelecionada ? (
          <EtapasDaAeronave
            aberto={true}
            etapas={etapasFiltro}
            onSalvar={reloadEtapas}
            onErro={setErro}
            aeronave_id={aeronaveSelecionada.id}
          />
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">Selecione uma aeronave para ver as etapas.</p>
          </div>
        )}

        <FormCadastroEtapa
          aberto={modalCadastro}
          fechado={() => setModalCadastro(false)}
          onSalvar={reloadEtapas}
          onErro={setErro}
          aeronave_id={aeronaveSelecionada?.id ?? ''}
        />
      </div>
    </div>
  );
}

export default VerEtapas;