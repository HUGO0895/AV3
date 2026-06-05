// relatorios.tsx
import { useState, useEffect } from 'react';
import '../index.css';
import Navbar from '../components/navbar';
import { FileText, Plane, ClipboardCheck, Settings, User, Layers, Calendar, Building2, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';

const BASE = 'http://localhost:3000';

interface Aeronave {
    id: string;
    modelo: string;
    tipo: string;
    capacidade: number;
    alcance: number;
}

interface Etapa {
    nome: string;
    prazo: string;
    status: string;
    aeronave_id: string;
    funcionarios?: any[];
}

interface Peca {
    nome: string;
    tipo: string;
    fornecedor: string;
    status: string;
    aeronave_id: string;
}

interface Teste {
    tipo: string;
    resultado: string;
    aeronave_id: string;
}

function Relatorios() {
    const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
    const [aeroSel, setAeroSel] = useState<Aeronave | null>(null);
    const [etapas, setEtapas] = useState<Etapa[]>([]);
    const [pecas, setPecas] = useState<Peca[]>([]);
    const [testes, setTestes] = useState<Teste[]>([]);
    const [cliente, setCliente] = useState('');
    const [prazo, setPrazo] = useState('');
    const [carregando, setCarregando] = useState(false);

    const todasEtapasConcluidas = etapas.length > 0 && etapas.every(e => e.status === 'CONCLUIDA');
    const todosTestesAprovados = testes.length > 0 && testes.every(t => t.resultado === 'APROVADO');
    const temFuncionariosNasEtapas = etapas.length > 0 && etapas.every(e => e.funcionarios && e.funcionarios.length > 0);
    const podGerarPdf = todasEtapasConcluidas && todosTestesAprovados && !!cliente && !!prazo && temFuncionariosNasEtapas;

    const getHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    const nomeFunc = (f: any): string => {
        if (typeof f === 'string') return f;
        if (f?.funcionario?.nome) return f.funcionario.nome;
        if (f?.funcionario?.usuario) return f.funcionario.usuario;
        return '';
    };

    useEffect(() => {
        fetch(`${BASE}/aeronaves`, { headers: getHeaders() })
            .then(r => r.json())
            .then(data => {
                if (data.status === 'sucess' && data.resposta.length > 0) {
                    setAeronaves(data.resposta);
                    setAeroSel(data.resposta[0]);
                }
            });
    }, []);

    useEffect(() => {
        if (!aeroSel) return;
        setCarregando(true);
        Promise.all([
            fetch(`${BASE}/etapas/${aeroSel.id}`, { headers: getHeaders() }).then(r => r.json()),
            fetch(`${BASE}/peca/${aeroSel.id}`, { headers: getHeaders() }).then(r => r.json()),
            fetch(`${BASE}/testes/${aeroSel.id}`, { headers: getHeaders() }).then(r => r.json()),
        ]).then(([etapaData, pecaData, testeData]) => {
            setEtapas(etapaData.status === 'sucess' ? etapaData.resposta : []);
            setPecas(pecaData.status === 'sucess' ? pecaData.resposta : []);
            setTestes(testeData.status === 'sucess' ? testeData.resposta : []);
        }).finally(() => setCarregando(false));
    }, [aeroSel]);

    const gerarPDF = () => {
        if (!aeroSel || !podGerarPdf) return;

        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const W = 210;
        let y = 0;

        doc.setFillColor(18, 51, 84);
        doc.rect(0, 0, W, 50, 'F');

        const logo = new Image();
        logo.src = '/aerocode.png';
        logo.onload = () => { doc.addImage(logo, 'PNG', 10, 5, 35, 35); finalizarPDF(); };
        logo.onerror = () => finalizarPDF();

        const finalizarPDF = () => {
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(22);
            doc.text('RELATÓRIO TÉCNICO', 55, 20);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('AEROCODE — Sistema de Engenharia Aeronáutica', 55, 28);
            doc.setFontSize(9);
            doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 55, 35);

            doc.setFillColor(220, 38, 38);
            doc.rect(0, 50, W, 3, 'F');

            y = 65;

            doc.setFillColor(243, 244, 246);
            doc.roundedRect(10, y, W - 20, 45, 3, 3, 'F');
            doc.setTextColor(18, 51, 84);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.text(aeroSel.modelo, 18, y + 10);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);

            const col1x = 18, col2x = 80, col3x = 140;

            doc.setFont('helvetica', 'bold');
            doc.text('ID / MATRÍCULA', col1x, y + 20);
            doc.text('TIPO', col2x, y + 20);
            doc.text('CAPACIDADE', col3x, y + 20);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(18, 51, 84);
            doc.text(aeroSel.id, col1x, y + 27);
            doc.text(aeroSel.tipo, col2x, y + 27);
            doc.text(`${aeroSel.capacidade} assentos`, col3x, y + 27);

            doc.setFont('helvetica', 'bold');
            doc.setTextColor(80, 80, 80);
            doc.text('ALCANCE', col1x, y + 35);
            doc.text('CLIENTE', col2x, y + 35);
            doc.text('PRAZO FINAL', col3x, y + 35);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(18, 51, 84);
            doc.text(`${aeroSel.alcance} km`, col1x, y + 42);
            doc.text(cliente.toUpperCase(), col2x, y + 42);
            doc.text(new Date(prazo).toLocaleDateString('pt-BR'), col3x, y + 42);

            y += 55;

            doc.setFillColor(18, 51, 84);
            doc.rect(10, y, W - 20, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('PEÇAS REGISTRADAS', 15, y + 5.5);
            y += 12;

            pecas.forEach((p) => {
                doc.setFillColor(249, 250, 251);
                doc.roundedRect(10, y, W - 20, 14, 2, 2, 'F');
                doc.setTextColor(18, 51, 84);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(9);
                doc.text(p.nome, 15, y + 6);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 100, 100);
                doc.setFontSize(8);
                doc.text(`${p.tipo} — Fornecedor: ${p.fornecedor}`, 15, y + 11);
                doc.setTextColor(22, 163, 74);
                doc.setFont('helvetica', 'bold');
                doc.text(p.status, W - 30, y + 8);
                y += 16;
            });

            y += 5;

            doc.setFillColor(18, 51, 84);
            doc.rect(10, y, W - 20, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('ETAPAS DE PRODUÇÃO', 15, y + 5.5);
            y += 12;

            etapas.forEach((e, i) => {
                doc.setFillColor(239, 246, 255);
                doc.roundedRect(10, y, W - 20, 16, 2, 2, 'F');
                doc.setFillColor(18, 51, 84);
                doc.circle(18, y + 8, 4, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(8);
                doc.text(`${i + 1}`, 16.5, y + 9.5);
                doc.setTextColor(18, 51, 84);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(9);
                doc.text(e.nome, 25, y + 7);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 100, 100);
                doc.setFontSize(8);
                const equipe = e.funcionarios && e.funcionarios.length > 0
                    ? e.funcionarios.map(nomeFunc).join(', ')
                    : 'Sem responsáveis';
                doc.text(`Equipe: ${equipe}  |  Prazo: ${new Date(e.prazo).toLocaleDateString('pt-BR')}`, 25, y + 13);
                doc.setTextColor(22, 163, 74);
                doc.setFont('helvetica', 'bold');
                doc.text(e.status, W - 35, y + 9);
                y += 18;
            });

            y += 5;

            doc.setFillColor(18, 51, 84);
            doc.rect(10, y, W - 20, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('CONTROLE DE QUALIDADE — TESTES', 15, y + 5.5);
            y += 12;

            doc.setFillColor(229, 231, 235);
            doc.rect(10, y, W - 20, 8, 'F');
            doc.setTextColor(80, 80, 80);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.text('TIPO DE TESTE', 15, y + 5.5);
            doc.text('RESULTADO', W - 40, y + 5.5);
            y += 10;

            testes.forEach((t) => {
                doc.setFillColor(249, 250, 251);
                doc.rect(10, y, W - 20, 10, 'F');
                doc.setTextColor(18, 51, 84);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(9);
                doc.text(t.tipo, 15, y + 7);
                const aprovado = t.resultado === 'APROVADO';
                doc.setFillColor(aprovado ? 220 : 254, aprovado ? 252 : 226, aprovado ? 231 : 226);
                doc.roundedRect(W - 50, y + 2, 35, 6, 1, 1, 'F');
                doc.setTextColor(aprovado ? 22 : 220, aprovado ? 163 : 38, aprovado ? 74 : 38);
                doc.setFontSize(8);
                doc.text(t.resultado ?? 'PENDENTE', W - 47, y + 6.5);
                y += 12;
            });

            doc.setFillColor(18, 51, 84);
            doc.rect(0, 282, W, 15, 'F');
            doc.setFillColor(220, 38, 38);
            doc.rect(0, 280, W, 2, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.text('AEROCODE — Documento gerado automaticamente pelo sistema.', 10, 291);
            doc.text('Página 1', W - 25, 291);

            doc.save(`relatorio_${aeroSel.id}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`);
        };
    };

    return (
        <div className="min-h-screen pb-10 bg-gray-50">
            <Navbar />
            <main className="max-w-6xl mx-auto mt-4 p-4">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div>
                        <div className="flex items-center gap-2 text-[#123354] mb-1">
                            <FileText size={20} />
                            <span className="font-bold tracking-widest text-sm uppercase">Sistema de Engenharia</span>
                        </div>
                        <h1 className="text-4xl font-black text-[#123354] tracking-tight">Relatório Técnico</h1>
                        <p className="text-gray-500 mt-2 font-medium">Configure os dados de exportação</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Cliente *</label>
                            <div className="relative">
                                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="Ex: Embraer"
                                    className={`bg-gray-50 border-2 rounded-2xl pl-11 pr-4 py-3 text-[#123354] font-bold focus:border-[#123354] outline-none transition-all shadow-inner min-w-[200px] ${!cliente ? 'border-red-200' : 'border-gray-100'}`}
                                    value={cliente} onChange={(e) => setCliente(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Prazo Final *</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="date"
                                    className={`bg-gray-50 border-2 rounded-2xl pl-11 pr-4 py-3 text-[#123354] font-bold focus:border-[#123354] outline-none transition-all shadow-inner ${!prazo ? 'border-red-200' : 'border-gray-100'}`}
                                    value={prazo} onChange={(e) => setPrazo(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Aeronave</label>
                            <select className="appearance-none bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-3 pr-12 text-[#123354] font-bold focus:border-[#123354] outline-none transition-all cursor-pointer shadow-inner"
                                onChange={(e) => {
                                    const sel = aeronaves.find(a => a.id === e.target.value);
                                    if (sel) setAeroSel(sel);
                                }}>
                                {aeronaves.map((a) => (
                                    <option key={a.id} value={a.id}>{a.id}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {aeroSel && (
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            <div className="lg:col-span-4 bg-[#123354] p-10 text-white flex flex-col justify-between">
                                <div>
                                    <div className="bg-blue-400/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        <Plane size={32} />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-6">{aeroSel.modelo}</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Matrícula (Código)</p>
                                            <p className="text-xl font-mono bg-white/10 inline-block px-3 py-1 rounded-lg italic">{aeroSel.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Tipo</p>
                                            <p className="text-lg font-semibold uppercase">{aeroSel.tipo}</p>
                                        </div>
                                        {cliente && (
                                            <div>
                                                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Cliente Solicitante</p>
                                                <p className="text-lg font-semibold uppercase">{cliente}</p>
                                            </div>
                                        )}
                                        {prazo && (
                                            <div>
                                                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Data Limite</p>
                                                <p className="text-lg font-semibold">{new Date(prazo).toLocaleDateString('pt-BR')}</p>
                                            </div>
                                        )}
                                        <div className="pt-4 border-t border-white/10 space-y-4">
                                            <div>
                                                <p className="text-blue-200 text-[10px] font-bold uppercase mb-1">Capacidade</p>
                                                <p className="text-md font-medium">{aeroSel.capacidade} Assentos</p>
                                            </div>
                                            <div>
                                                <p className="text-blue-200 text-[10px] font-bold uppercase mb-1">Alcance</p>
                                                <p className="text-md font-medium">{aeroSel.alcance} km</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12">
                                    {!podGerarPdf && !carregando && (
                                        <div className="flex items-start gap-2 bg-red-500/20 border border-red-400/30 rounded-2xl p-3 mb-4">
                                            <AlertCircle size={16} className="text-red-300 mt-0.5 shrink-0" />
                                            <p className="text-red-200 text-xs font-medium">
                                                {!cliente && !prazo
                                                    ? 'Preencha o cliente e o prazo final.'
                                                    : !cliente
                                                    ? 'Preencha o cliente.'
                                                    : !prazo
                                                    ? 'Preencha o prazo final.'
                                                    : !temFuncionariosNasEtapas
                                                    ? 'Todas as etapas precisam ter funcionários responsáveis.'
                                                    : !todasEtapasConcluidas && !todosTestesAprovados
                                                    ? 'Etapas pendentes e testes reprovados/pendentes.'
                                                    : !todasEtapasConcluidas
                                                    ? 'Existem etapas não concluídas.'
                                                    : 'Existem testes não aprovados.'}
                                            </p>
                                        </div>
                                    )}
                                    <button
                                        onClick={gerarPDF}
                                        disabled={!podGerarPdf}
                                        className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all ${
                                            podGerarPdf
                                                ? 'bg-white text-[#123354] hover:bg-blue-50 active:scale-95 shadow-lg cursor-pointer'
                                                : 'bg-white/20 text-white/40 cursor-not-allowed'
                                        }`}>
                                        <FileText size={20} />
                                        GERAR PDF
                                    </button>
                                </div>
                            </div>

                            <div className="lg:col-span-8 p-10">
                                {carregando ? (
                                    <div className="flex items-center justify-center h-full text-gray-400 font-bold">Carregando...</div>
                                ) : (
                                    <div className="grid gap-10">
                                        <section>
                                            <h3 className="flex items-center gap-2 text-[#123354] font-bold text-xl mb-4 border-b pb-2">
                                                <Settings size={20} /> Peças Registradas
                                            </h3>
                                            {pecas.length === 0 ? (
                                                <p className="text-gray-400 text-sm">Nenhuma peça registrada.</p>
                                            ) : (
                                                <div className="flex flex-wrap gap-3">
                                                    {pecas.map((p, i) => (
                                                        <div key={i} className="flex flex-col bg-gray-50 p-4 rounded-2xl border border-gray-100 min-w-[200px]">
                                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{p.tipo}</span>
                                                            <span className="text-[#123354] font-bold">{p.nome}</span>
                                                            <span className="text-[10px] mt-1 text-gray-400 font-medium">{p.fornecedor}</span>
                                                            <span className="text-[10px] mt-2 font-bold text-green-600 bg-green-50 self-start px-2 py-0.5 rounded-md italic">{p.status}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </section>

                                        <section>
                                            <h3 className="flex items-center gap-2 text-[#123354] font-bold text-xl mb-4 border-b pb-2">
                                                <Layers size={20} /> Etapas de Produção e Responsáveis
                                            </h3>
                                            {etapas.length === 0 ? (
                                                <p className="text-gray-400 text-sm">Nenhuma etapa registrada.</p>
                                            ) : (
                                                <div className="space-y-3">
                                                    {etapas.map((etapa, i) => (
                                                        <div key={i} className="flex items-center justify-between p-4 bg-blue-50/30 rounded-2xl border border-blue-100/50">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-full bg-[#123354] text-white flex items-center justify-center font-bold text-xs">{i + 1}</div>
                                                                <div>
                                                                    <h4 className="font-bold text-[#123354]">{etapa.nome}</h4>
                                                                    <div className="flex items-center gap-1 text-gray-500">
                                                                        <User size={12} />
                                                                        <p className="text-xs font-medium">
                                                                            {etapa.funcionarios && etapa.funcionarios.length > 0
                                                                                ? `Equipe: ${etapa.funcionarios.map(nomeFunc).join(', ')}`
                                                                                : 'Sem responsáveis'}
                                                                        </p>
                                                                    </div>
                                                                    <p className="text-xs text-gray-400">Prazo: {new Date(etapa.prazo).toLocaleDateString('pt-BR')}</p>
                                                                </div>
                                                            </div>
                                                            <span className={`text-[10px] font-black px-3 py-1 rounded-full shadow-sm border ${
                                                                etapa.status === 'CONCLUIDA'
                                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                                    : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                            }`}>{etapa.status}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </section>

                                        <section>
                                            <h3 className="flex items-center gap-2 text-[#123354] font-bold text-xl mb-4 border-b pb-2">
                                                <ClipboardCheck size={20} /> Controle de Qualidade (Testes)
                                            </h3>
                                            {testes.length === 0 ? (
                                                <p className="text-gray-400 text-sm">Nenhum teste registrado.</p>
                                            ) : (
                                                <div className="overflow-hidden border border-gray-100 rounded-2xl">
                                                    <table className="w-full text-left border-collapse">
                                                        <thead>
                                                            <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                                                                <th className="px-6 py-4">Tipo de Teste</th>
                                                                <th className="px-6 py-4 text-right">Resultado Final</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-50">
                                                            {testes.map((teste, i) => (
                                                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                                    <td className="px-6 py-4 font-bold text-[#123354]">{teste.tipo}</td>
                                                                    <td className="px-6 py-4 text-right">
                                                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest ${
                                                                            teste.resultado === 'APROVADO'
                                                                                ? 'bg-green-100 text-green-600 border border-green-200'
                                                                                : teste.resultado
                                                                                ? 'bg-red-100 text-red-600 border border-red-200'
                                                                                : 'bg-yellow-100 text-yellow-600 border border-yellow-200'
                                                                        }`}>{teste.resultado ?? 'PENDENTE'}</span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </section>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Relatorios;