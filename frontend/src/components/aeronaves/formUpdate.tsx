import '../../index.css'
interface props{
     aberto:boolean;
     fechado:()=>void
     aeronave: {id:string,modelo:string,capacidade:number,alcance:number,tipo:string}
}
function FormEditarAero({aberto,fechado,aeronave}:props) {
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
                        defaultValue={aeronave.id}
                        className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 outline-none"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Modelo</label>
                    <input
                        type="text"
                        defaultValue={aeronave.modelo}
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select name="Tipo" id="" className='px-4 py-[11px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none bg-white'>
                        <option value="COMERCIAL">Comercial</option>
                        <option value="MILITAR">Militar</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Alcance (km)</label>
                    <input
                        type="string"
                        defaultValue={aeronave.alcance}
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Capacidade</label>
                    <input
                        type="text"
                        defaultValue={aeronave.capacidade}
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#123354] outline-none"
                    />
                </div>

                <div className="lg:col-span-4 flex justify-end mt-4">
                    <button
                        type="submit"
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