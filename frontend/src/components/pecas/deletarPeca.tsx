import '../../index.css'
interface props{
  aberto:boolean;
  fechado:()=>void
  nomeAero:string
}
function FormDeletarPeca({aberto,fechado,nomeAero}:props) {
    if(!aberto)return null
    return (
        <div className="max-w-xl mx-auto m-5  p-8 bg-white border border-gray-200 rounded-3xl shadow-sm fixed inset-70 justify-center flex items-center z-50 top-70">
           <div className='flex justify-between'>  <h2 className="text-2xl font-bold text-[#123354] mb-6 absolute top-8 left-12 ">Deletar Peça</h2> <button 
                    onClick={fechado}
                    className="absolute top-8 right-12 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
                >X
        
              </button> </div>

            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

                <div className="flex flex-col md:col-span-2 lg:col-span-1 ">
                    <label className="text-sm font-medium text-gray-700 mb-1">Nome da Peça</label>
                    <input 
                        type="text"
                        value={nomeAero}
                        className="mr-10 w-50 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                </div>

                <div className="lg:col-span-3 flex justify-start">
                    <button
                        type="submit"
                        className="ml-20 bg-red-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-red-700 transition-all shadow-sm"
                    >
                        Excluir Peça
                    </button>
                </div>
                
                <div className="lg:col-span-4 mt-2">
                    <p className="text-sm text-gray-500 italic">
                        * Atenção: Esta ação é irreversível e removerá todos os dados da aeronave do sistema.
                    </p>
                </div>
            </form>
        </div>
    )
}

export default FormDeletarPeca