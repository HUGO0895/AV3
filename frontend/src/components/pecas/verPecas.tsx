import { useEffect, useState } from 'react'
import '../../index.css'
import PecasdeAeronaves from './pecasdeAerovanes'
import FormCadastroPeca from './cadastrarPecas'
import AeroServ from '../../service/AeronaveService'
import { ResponseAero } from '../../types/aeronave'
import { ResponsePeca } from '../../types/pecas'
import PecaServ from '../../service/PecaService'

function VerPecas() {
  const [pecasDaAeronave, setPecasDaAeronave] = useState<ResponsePeca[]>([])
  const [aeronaves, setAero] = useState<ResponseAero[]>([])
  const [ModalCadastro, setModalCadastro] = useState(false)
  const [Busca, setBusca] = useState('TODOS')
  const [BuscaNome, setBuscaNome] = useState('')
  const [aeronaveSelecionada, setAeronaveSelecionada] = useState<ResponseAero | undefined>(undefined)
  const [erro, setErro] = useState<string | null>(null)

  const buscarPecas = async (id: string) => {
    const resposta = await PecaServ.get(id)
    setPecasDaAeronave(resposta.resposta)
  }

  const reloadPecas = () => {
    if (aeronaveSelecionada) buscarPecas(aeronaveSelecionada.id)
  }

  const buscar = async () => {
    const resposta = await AeroServ.get()
    setAero(resposta.resposta)
  }

  useEffect(() => {
    buscar()
    const intervalo = setInterval(() => { buscar() }, 10000)
    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="max-w-5xl w-full mx-auto p-8 bg-white border border-gray-200 rounded-3xl shadow-sm flex flex-col gap-6">
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-xl text-[#123354]'>Selecione a Aeronave</h1>
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">Buscar Nome</label>
          <input
            type="text"
            placeholder="Ex: Turbina"
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
          Adicionar Peças
        </button>
      </div>

      <div className='flex justify-between items-center'>
        <div className="flex items-center gap-3">
          <select onChange={(e) => {
            if (!e.target.value) return
            const aeronave = JSON.parse(e.target.value)
            setAeronaveSelecionada(aeronave)
            buscarPecas(aeronave.id)
            setErro(null)
          }} className='border-2 rounded-2xl max-w-xs px-4 py-3 border-gray-100 text-[#123354] font-bold outline-none focus:border-[#123354]'>
            <option value="">Selecione uma aeronave</option>
            {aeronaves.map((aeronave) => (
              <option key={aeronave.id} value={JSON.stringify(aeronave)}>{aeronave.id}</option>
            ))}
          </select>
          {erro && (
            <span className="text-red-500 text-sm font-semibold bg-red-50 px-3 py-1 rounded-xl">
              {erro}
            </span>
          )}
        </div>

        <div className='px-8'>
          {['TODOS', 'IMPORTADA', 'NACIONAL'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setBusca(tipo)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${Busca === tipo ? 'bg-[#123354] text-white shadow-md' : 'text-gray-400 hover:text-[#123354]'}`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>

      {aeronaveSelecionada ? (
        <PecasdeAeronaves
          aberto={true}
          aeronavePecas={pecasDaAeronave}
          buscaNome={BuscaNome.toLowerCase()}
          buscaT={Busca}
          onSalvar={reloadPecas}
          onErro={setErro}
        />
      ) : (
        <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-bold">Selecione uma aeronave para ver as peças.</p>
        </div>
      )}

      <FormCadastroPeca
        aberto={ModalCadastro}
        fechado={() => setModalCadastro(false)}
        onSalvar={reloadPecas}
        onErro={setErro}
        aeronave_id={aeronaveSelecionada?.id ?? ''}
      />
    </div>
  )
}

export default VerPecas