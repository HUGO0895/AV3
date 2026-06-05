import { useState } from 'react';
import FormEditarTeste from './editarTeste';
import FormDeletarTeste from './deletarTeste';
import { ResponseTips } from '../../types/teste';

interface TesteProps {
    aberto: boolean;
    testes: ResponseTips[];
    onAtualizar: () => void;
    aeronave_id: string;
}

function TestesDaAeronave({ aberto, testes, onAtualizar, aeronave_id }: TesteProps) {
    const [modalEditar, setModalEditar] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);
    const [testeSel, setTesteSel] = useState<ResponseTips | null>(null);
    const [erro, setErro] = useState<string | null>(null);

    if (!aberto) return null;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {erro && <p className='text-red-500 text-sm font-bold col-span-3'>{erro}</p>}

                {testes.length === 0 && (
                    <p className='text-gray-400 italic text-sm'>Nenhum teste encontrado para essa aeronave.</p>
                )}

                {testes.map((teste, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm border-l-8 flex flex-col gap-3"
                        style={{ borderLeftColor: teste.resultado === 'APROVADO' ? '#22c55e' : teste.resultado === 'REPROVADO' ? '#ef4444' : '#f59e0b' }}>

                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">TESTE {teste.tipo}</span>
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
                                teste.resultado === 'APROVADO' ? 'bg-green-50 text-green-700 border-green-200' :
                                teste.resultado === 'REPROVADO' ? 'bg-red-50 text-red-700 border-red-200' :
                                'bg-yellow-50 text-yellow-700 border-yellow-200'
                            }`}>
                                {teste.resultado}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#123354]">{teste.tipo}</h3>

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => { setErro(null); setTesteSel(teste); setModalEditar(true); }}
                                className="flex-1 py-2 bg-gray-100 text-[#123354] rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => { setErro(null); setTesteSel(teste); setModalDeletar(true); }}
                                className="px-4 py-2 text-red-500 rounded-xl font-bold text-sm hover:bg-red-50 transition-all"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {testeSel && (
                <>
                    <FormEditarTeste
                        aberto={modalEditar}
                        fechado={() => { setErro(null); setModalEditar(false); }}
                        teste={testeSel}
                        onSalvar={() => { setErro(null); onAtualizar(); setModalEditar(false); }}
                        onErro={(msg) => setErro(msg)}
                    />
                    <FormDeletarTeste
                        aberto={modalDeletar}
                        fechado={() => { setErro(null); setModalDeletar(false); }}
                        teste={testeSel}
                        onDeletar={() => { setErro(null); onAtualizar(); setModalDeletar(false); }}
                    />
                </>
            )}
        </>
    );
}

export default TestesDaAeronave;