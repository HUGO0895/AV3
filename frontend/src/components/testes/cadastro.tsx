import '../../index.css';

function FormCadastroTeste({ aberto, fechado }: { aberto: boolean, fechado: () => void }) {
    if (!aberto) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl relative">
                <button onClick={fechado} className="absolute top-5 right-6 text-gray-400 hover:text-red-500 text-2xl font-bold">✕</button>
                <h2 className="text-2xl font-bold text-[#123354] mb-6">Novo Registro de Teste</h2>
                <form className="flex flex-col gap-5">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tipo de Teste</label>
                        <select className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-[#123354]">
                            <option value="ELÉTRICO">ELÉTRICO</option>
                            <option value="HIDRÁULICO">HIDRÁULICO</option>
                            <option value="AERODINÂMICO">AERODINÂMICO</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Resultado</label>
                        <div className="flex gap-2 mt-1">
                            <button type="button" className="flex-1 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl font-bold">APROVADO</button>
                            <button type="button" className="flex-1 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold">REPROVADO</button>
                        </div>
                    </div>
                    <button type="submit" className="bg-[#123354] text-white py-4 rounded-2xl font-bold mt-4">Salvar Relatório</button>
                </form>
            </div>
        </div>
    );
}

export default FormCadastroTeste;