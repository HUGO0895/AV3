import { useState, useEffect } from 'react';
import '../index.css';
import FormCadastroFuncionario from '../components/funcionarios/cadastro';
import FormEditarFuncionario from '../components/funcionarios/editar';
import ModalDeletarFuncionario from '../components/funcionarios/deletar';
import ModalVerFuncionario from '../components/funcionarios/visualizar';
import Navbar from '../components/navbar';
import FuncServ from '../service/FuncService';
import { ResponseFuncionario } from '../types/funcionario';
 
function GerenciarFuncionarios() {
    const [funcionarios, setFuncionarios] = useState<ResponseFuncionario[]>([])
    const [funcSel, setFuncSel] = useState<ResponseFuncionario | null>(null)
    const [nome, setNome] = useState('')
    const [nivel, setNivel] = useState('TODOS')
    const [modalCad, setModalCad] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDel, setModalDel] = useState(false)
    const [modalVer, setModalVer] = useState(false)
    const [erro, setErro] = useState<string | null>(null)
 
    const buscarFuncionarios = async () => {
        const resposta = await FuncServ.get(undefined)
        if (resposta.status === 'sucess') {
            console.log(resposta)
            setFuncionarios(resposta.resposta)
        } else {
            setErro(resposta.resposta)
        }
    }
 
    useEffect(() => {
        buscarFuncionarios()
    }, [])
 
    const funcionariosFiltro = funcionarios.filter((func) => {
        const bateNome = nome === '' || func.nome.toLowerCase().includes(nome.toLowerCase())
        const bateNivel = nivel === 'TODOS' || func.nivelPermissao === nivel
        return bateNome && bateNivel
    })
 
    return (
        <div>
            <Navbar />
            <div className="max-w-6xl w-full mx-auto m-5 p-8 bg-white border border-gray-200 rounded-3xl shadow-sm">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-[#123354]">Equipe Aerocode</h1>
                        <p className="text-gray-500 font-medium">Gerenciamento de acessos e colaboradores</p>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">Buscar Nome</label>
                        <input
                            type="text"
                            placeholder="Ex: Hugo"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-[#123354] transition-all font-medium"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-6'>
                        <button
                            onClick={() => { setErro(null); setModalCad(true); }}
                            className="bg-[#123354] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#1a4a7a] shadow-lg transition-all active:scale-95"
                        >
                            + Adicionar Membro
                        </button>
                        <div>
                            {['TODOS', 'ENGENHEIRO', 'OPERADOR', 'ADMINISTRADOR'].map((tipo) => (
                                <button
                                    key={tipo}
                                    onClick={() => setNivel(tipo)}
                                    className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                        nivel === tipo ? 'bg-[#123354] text-white shadow-md' : 'text-gray-400 hover:text-[#123354]'
                                    }`}
                                >
                                    {tipo}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
 
                {erro && <p className='text-red-500 text-sm font-bold mb-4'>{erro}</p>}
 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {funcionariosFiltro.map((f, i) => (
                        <div key={i} className="bg-gray-50 border border-gray-100 rounded-3xl p-6 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black border ${
                                    f.nivelPermissao === 'ADMINISTRADOR' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                    f.nivelPermissao === 'ENGENHEIRO' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                    'bg-orange-50 text-orange-700 border-orange-100'
                                }`}>
                                    {f.nivelPermissao === 'ADMINISTRADOR' ? 'ADMINISTRADOR' : f.nivelPermissao}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-[#123354] mb-1">{f.nome}</h3>
                            <p className="text-sm text-gray-500 mb-6">@{f.usuario}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setFuncSel(f); setModalVer(true); }}
                                    className="flex-1 py-2 bg-white border border-gray-200 text-[#123354] rounded-xl font-bold text-xs hover:bg-gray-100 transition-all"
                                >
                                    Perfil
                                </button>
                                <button
                                    onClick={() => { setErro(null); setFuncSel(f); setModalEdit(true); }}
                                    className="px-4 py-2 bg-[#123354] text-white rounded-xl font-bold text-xs hover:bg-[#1a4a7a] transition-all"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => { setErro(null); setFuncSel(f); setModalDel(true); }}
                                    className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl font-bold text-xs transition-all"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
 
                <FormCadastroFuncionario
                    aberto={modalCad}
                    fechado={() => setModalCad(false)}
                    onSalvar={() => { setErro(null); buscarFuncionarios(); }}
                    onErro={(msg) => setErro(msg)}
                />
                {funcSel && (
                    <>
                        <FormEditarFuncionario
                            aberto={modalEdit}
                            fechado={() => { setErro(null); setModalEdit(false); }}
                            funcionario={funcSel}
                            onSalvar={() => { setErro(null); buscarFuncionarios(); setModalEdit(false); }}
                            onErro={(msg) => setErro(msg)}
                        />
                        <ModalDeletarFuncionario
                            aberto={modalDel}
                            fechado={() => { setErro(null); setModalDel(false); }}
                            funcionario={funcSel}
                            onDeletar={() => { setErro(null); buscarFuncionarios(); setModalDel(false); }}
                        />
                        <ModalVerFuncionario
                            aberto={modalVer}
                            fechado={() => setModalVer(false)}
                            funcionario={funcSel}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
 
export default GerenciarFuncionarios;
