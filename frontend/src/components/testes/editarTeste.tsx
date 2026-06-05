import { useState } from 'react';
import '../../index.css';
import TesteServ from '../../service/TesteService';
import { ResponseTips, updateTest } from '../../types/teste';

interface Props {
    aberto: boolean;
    fechado: () => void;
    teste: ResponseTips;
    onSalvar: () => void;
    onErro: (msg: string|null) => void;
}

function FormEditarTeste({ aberto, fechado, teste, onSalvar, onErro }: Props) {
    const [resultado, setResultado] = useState<updateTest['resultado']>(teste.resultado)

    if (!aberto) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl relative">
                <button onClick={fechado} className="absolute top-5 right-6 text-gray-400 hover:text-red-500 text-2xl font-bold">✕</button>
                <h2 className="text-2xl font-bold text-[#123354] mb-6">Editar Teste</h2>
                <div className="flex flex-col gap-5">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tipo de Teste</label>
                        <input
                            disabled
                            value={teste.tipo}
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-400"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Resultado</label>
                        <div className="flex gap-2 mt-1">
                            <button
                                type="button"
                                onClick={() => setResultado('APROVADO')}
                                className={`flex-1 py-3 rounded-xl font-bold border transition-all ${resultado === 'APROVADO' ? 'bg-green-600 text-white border-green-600' : 'bg-green-50 border-green-200 text-green-700'}`}
                            >
                                APROVADO
                            </button>
                            <button
                                type="button"
                                onClick={() => setResultado('REPROVADO')}
                                className={`flex-1 py-3 rounded-xl font-bold border transition-all ${resultado === 'REPROVADO' ? 'bg-red-600 text-white border-red-600' : 'bg-red-50 border-red-200 text-red-700'}`}
                            >
                                REPROVADO
                            </button>
                        </div>
                    </div>
                    <button
    type="button"
    onClick={async () => {
        const resposta = await TesteServ.update({
            tipo: teste.tipo,
            resultado,
            aeronave_id: teste.aeronave_id
        })
        if (resposta.status !== 'sucess') {
            onErro(resposta.resposta)
        } else {
            onErro(null)
            onSalvar()
        }
        fechado()
    }}
    className="bg-[#123354] text-white py-4 rounded-2xl font-bold mt-4"
>
    Salvar Alterações
</button>
                </div>
            </div>
        </div>
    );
}

export default FormEditarTeste;