import { useState } from 'react';
import '../../index.css'
import AeroServ from '../../service/AeronaveService';
import { createAero } from '../../types/aeronave';

interface props {
  aberto: boolean;
  fechado: () => void
  onSalvar: () => void
  onErro: (msg: string | null) => void
}

function FormCadastroAero({ aberto, fechado, onSalvar, onErro }: props) {
  const [aeronave, setAero] = useState<createAero>({
    id: '',
    modelo: '',
    capacidade: 0,
    alcance: 0,
    tipo: 'COMERCIAL'
  })

  const [erros, setErros] = useState<{ id?: string, modelo?: string, capacidade?: string, alcance?: string }>({})

  const mudanca = (campo: string, valor: unknown) => {
    setAero(prev => ({ ...prev, [campo]: valor }))
    setErros(prev => ({ ...prev, [campo]: undefined }))
  }

  const validar = () => {
    const novosErros: { id?: string, modelo?: string, capacidade?: string, alcance?: string } = {}
    if (!aeronave.id) novosErros.id = "ID obrigatório"
    if (!aeronave.modelo) novosErros.modelo = "Modelo obrigatório"
    if (!aeronave.capacidade) novosErros.capacidade = "Capacidade obrigatória"
    if (!aeronave.alcance) novosErros.alcance = "Alcance obrigatório"
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  if (!aberto) return null

  return (
    <div className="max-w-2xl mx-auto m-5 p-8 bg-white border border-gray-200 rounded-3xl shadow-sm fixed inset-40 justify-center flex items-center z-50">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-bold text-[#123354] mb-6 absolute top-8 left-12">Cadastrar Aeronave</h2>
        <button onClick={fechado} className="absolute top-8 right-12 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10">X</button>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">ID</label>
          <input
            onChange={(e) => mudanca('id', e.target.value)}
            type="text"
            placeholder="Ex: AC-001"
            className={`px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#123354] outline-none ${erros.id ? 'border-red-400' : 'border-gray-300'}`}
          />
          {erros.id && <span className="text-red-500 text-xs mt-1">{erros.id}</span>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Modelo</label>
          <input
            onChange={(e) => mudanca('modelo', e.target.value)}
            type="text"
            placeholder="Ex: Boeing 737"
            className={`px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#123354] outline-none ${erros.modelo ? 'border-red-400' : 'border-gray-300'}`}
          />
          {erros.modelo && <span className="text-red-500 text-xs mt-1">{erros.modelo}</span>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select onChange={(e) => mudanca('tipo', e.target.value)} className='px-4 py-[11px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none'>
            <option value="COMERCIAL">Comercial</option>
            <option value="MILITAR">Militar</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Alcance (km)</label>
          <input
            onChange={(e) => mudanca('alcance', Number(e.target.value))}
            type="number"
            placeholder="Ex: 5000"
            className={`px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#123354] outline-none ${erros.alcance ? 'border-red-400' : 'border-gray-300'}`}
          />
          {erros.alcance && <span className="text-red-500 text-xs mt-1">{erros.alcance}</span>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Capacidade</label>
          <input
            onChange={(e) => mudanca('capacidade', Number(e.target.value))}
            type="number"
            placeholder="Nº de passageiros"
            className={`px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#123354] outline-none ${erros.capacidade ? 'border-red-400' : 'border-gray-300'}`}
          />
          {erros.capacidade && <span className="text-red-500 text-xs mt-1">{erros.capacidade}</span>}
        </div>

        <div className="lg:col-span-4 flex justify-end mt-4">
          <button
            onClick={async () => {
              if (!validar()) return
              const resposta = await AeroServ.create(aeronave)
              if (resposta.status === "error") {
                onErro(resposta.resposta)
                fechado()
              } else {
                onErro(null)
                onSalvar()
                fechado()
              }
            }}
            type="button"
            className="bg-[#123354] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#1a4a7a] transition-all"
          >
            Salvar Aeronave
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormCadastroAero