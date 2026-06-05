import { useState } from 'react';
import '../../index.css';
import FuncServ from '../../service/FuncService';
import { ResponseFuncionario, updateFuncionario } from '../../types/funcionario';
 
interface Props {
    aberto: boolean;
    fechado: () => void;
    funcionario: ResponseFuncionario;
    onSalvar: () => void;
    onErro: (msg: string | null) => void;
}
 
function FormEditarFuncionario({ aberto, fechado, funcionario, onSalvar, onErro }: Props) {
    const [form, setForm] = useState<updateFuncionario>({
        usuario: funcionario.usuario,
        nome: funcionario.nome,
        telefone: funcionario.telefone,
        endereco: funcionario.endereco,
        nivelPermissao: funcionario.nivelPermissao,
    });
 
    const mudanca = (campo: string, valor: string) =>
        setForm(prev => ({ ...prev, [campo]: valor }));
 
    if (!aberto) return null;
 
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="max-w-2xl w-full bg-white rounded-3xl p-8 relative shadow-2xl">
                <button
                    onClick={fechado}
                    className="absolute top-5 right-6 text-gray-400 hover:text-red-500 text-2xl font-bold"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold text-[#123354] mb-8">Editar Membro</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            value={form.nome}
                            onChange={(e) => mudanca('nome', e.target.value)}
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#123354] transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                            Usuário (Login)
                        </label>
                        <input
                            type="text"
                            disabled
                            value={form.usuario}
                            className="w-full mt-1 p-3 bg-gray-100 border border-gray-200 rounded-xl outline-none opacity-70 cursor-not-allowed font-semibold"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                            Telefone
                        </label>
                        <input
                            type="text"
                            value={form.telefone}
                            onChange={(e) => mudanca('telefone', e.target.value)}
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#123354] transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                            Nível de Permissão
                        </label>
                        <select
                            value={form.nivelPermissao}
                            onChange={(e) => mudanca('nivelPermissao', e.target.value)}
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#123354] transition-all"
                        >
                            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                            <option value="ENGENHEIRO">ENGENHEIRO</option>
                            <option value="OPERADOR">OPERADOR</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                            Endereço
                        </label>
                        <input
                            type="text"
                            value={form.endereco}
                            onChange={(e) => mudanca('endereco', e.target.value)}
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#123354] transition-all"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={fechado}
                        className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 font-semibold transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={async () => {
                            try {
                                onErro(null);
                                await FuncServ.update(form);
                                onSalvar();
                                fechado();
                            } catch (err: any) {
                                onErro(err?.response?.data?.message ?? 'Erro ao salvar alterações.');
                            }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#123354] text-white font-semibold hover:bg-[#1a4a72] transition-all"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default FormEditarFuncionario;
