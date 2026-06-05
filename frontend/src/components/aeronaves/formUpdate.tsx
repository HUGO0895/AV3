import { useState } from 'react';
import '../../index.css'

import AeroServ from '../../service/AeronaveService';
import {  ResponseAero, updateAero } from '../../types/aeronave';
interface props{
     aberto:boolean;
     fechado:()=>void
     onSalvar:()=>void
     aeronave:ResponseAero
       onErro: (msg: string| null) => void
}
function FormEditarAero({aberto,fechado,aeronave,onSalvar,onErro}:props) {
  
    const [Aero,setAero]=useState<updateAero>({
             id: aeronave.id,
      modelo: aeronave.modelo,
      capacidade: aeronave.capacidade,
      alcance: aeronave.alcance,
      tipo: aeronave.tipo
          })
    
       const mudanca=(campo:string,valor:unknown)=>{
                setAero((prev)=>({
                  ...prev,
                  [campo]:valor
    
                }))
       }
         if(!aberto)return null
    return (
        <div className="max-w-2xl mx-auto m-5 p-8 bg-white border border-gray-200 rounded-3xl shadow-sm fixed inset-40 justify-center flex items-center z-50 bottom-70">
              <div className='flex justify-between'>  <h2 className="text-2xl font-bold text-[#123354] mb-6 absolute top-8 left-12 ">Editar Aeronave</h2> <button 
                    onClick={fechado}
                    className="absolute top-8 right-12 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
                >X
        
              </button> </div>

            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">ID</label>
                    <input
                        type="text"
                         value={aeronave.id}
                        className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 outline-none"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Modelo</label>
                    <input
                        onChange={(e)=>mudanca('modelo',e.target.value)}
                        type="text"
                        defaultValue={aeronave.modelo}
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select name="Tipo" id="" defaultValue={aeronave.tipo} onChange={(e)=>mudanca('tipo',e.target.value)} className='px-4 py-[11px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-white'>
                        <option value="COMERCIAL">Comercial</option>
                        <option value="MILITAR">Militar</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Alcance (km)</label>
                    <input
                        type="string"
                         onChange={(e)=>mudanca('alcance',Number(e.target.value))}
                        defaultValue={aeronave.alcance}
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Capacidade</label>
                    <input
                        type="text"
                         onChange={(e)=>mudanca('capacidade',Number(e.target.value))}
                        defaultValue={aeronave.capacidade}
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none"
                    />
                </div>

                <div className="lg:col-span-4 flex justify-end mt-4">
                    <button onClick={async ()=>{const resposta= await AeroServ.update(Aero);
                  if (resposta.status=="error"){
              onErro(resposta.resposta)
            }else{
              onErro(null)
            }onSalvar();fechado()}}
                        type="button"
                        className="bg-[#123354] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#1a4a7a] transition-all"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormEditarAero