import { useState } from 'react';
import '../../index.css';
import TesteServ from '../../service/TesteService';
import { createTest } from '../../types/teste';

interface Props {
    aberto: boolean;
    fechado: () => void;
    aeronave_id: string;
    onSalvar: () => void;
    onErro: (msg: string | null) => void;
}

function FormCadastroTeste({ aberto, fechado, aeronave_id, onSalvar, onErro }: Props) {
    const [tipo, setTipo] = useState<createTest['tipo']>('ELETRICO')

    if (!aberto) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl relative">
                <button onClick={fechado} className="absolute top-5 right-6 text-gray-400 hover:text-red-500 text-2xl font-bold">✕</button>
                <h2 className="text-2xl font-bold text-[#123354] mb-6">Novo Registro de Teste</h2>
                <div className="flex flex-col gap-5">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tipo de Teste</label>
                        <select
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-[#123354]"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value as createTest['tipo'])}
                        >
                            <option value="ELETRICO">ELÉTRICO</option>
                            <option value="HIDRAULICO">HIDRÁULICO</option>
                            <option value="AERODINAMICO">AERODINÂMICO</option>
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={async () => {
                            const resposta = await TesteServ.create({ tipo, aeronave_id })
                            if (resposta.status !== 'sucess') {
                                onErro(resposta.resposta)
                                fechado()
                            } else {
                                onErro(null)
                                onSalvar()
                                fechado()
                            }
                        }}
                        className="bg-[#123354] text-white py-4 rounded-2xl font-bold mt-4"
                    >
                        Salvar Relatório
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormCadastroTeste;