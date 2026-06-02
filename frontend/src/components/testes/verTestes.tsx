import { useState } from 'react';
import FormEditarTeste from './cadastro';
import FormDeletarTeste from './deletarTeste';

interface TesteProps {
    aberto: boolean;
    testes: Array<{ 
        tipo: 'ELÉTRICO' | 'HIDRÁULICO' | 'AERODINÂMICO', 
        resultado: 'APROVADO' | 'REPROVADO', 
        data: string 
    }>;
}

function TestesDaAeronave({ aberto, testes }: TesteProps) {
    const [modalEditar, setModalEditar] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);
    const [testeSel, setTesteSel] = useState({ tipo: '', resultado: '', data: '' });

    if (!aberto || !testes) return null;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testes.map((teste, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm border-l-8 flex flex-col gap-3" 
                         style={{ borderLeftColor: teste.resultado === 'APROVADO' ? '#22c55e' : '#ef4444' }}>
                        
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">TESTE {teste.tipo}</span>
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${teste.resultado === 'APROVADO' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                {teste.resultado}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#123354]">{teste.tipo}</h3>
                        <p className="text-xs text-gray-500 font-medium">Data: {teste.data}</p>

                        <div className="flex gap-2 mt-4">
                            <button 
                                onClick={() => { setTesteSel(teste); setModalEditar(true); }}
                                className="flex-1 py-2 bg-gray-100 text-[#123354] rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
                            >
                                Detalhes
                            </button>
                            <button 
                                onClick={() => { setTesteSel(teste); setModalDeletar(true); }}
                                className="px-4 py-2 text-red-500 rounded-xl font-bold text-sm hover:bg-red-50 transition-all"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <FormEditarTeste aberto={modalEditar} fechado={() => setModalEditar(false)}  />
            <FormDeletarTeste aberto={modalDeletar} fechado={() => setModalDeletar(false)} tipoTeste={testeSel.tipo} />
        </>
    );
}

export default TestesDaAeronave;