import React, { useState } from 'react';

// 1. Definindo as Tipagens (Interfaces)
interface Disciplina {
  nome: string;
  curso: string;
  semestre: string;
}

interface ProfessorData {
  id: number;
  name: string;
  disciplinas: Disciplina[];
}

interface ContatoForm {
  nome: string;
  assunto: string;
  mensagem: string;
}

const PROFESSORES: ProfessorData[] = [
  {
    id: 1, name: 'Prof. José',
    disciplinas: [
      { nome: 'Criptografia Aplicada', curso: 'ADS', semestre: '3º Semestre' },
      { nome: 'Lógica Computacional', curso: 'Ciência da Computação', semestre: '1º Semestre' }
    ]
  },
  {
    id: 2, name: 'Prof. Rodolfo',
    disciplinas: [
      { nome: 'Sistemas Operacionais', curso: 'ADS', semestre: '4º Semestre' },
      { nome: 'Administração de Servidores', curso: 'Redes', semestre: '5º Semestre' }
    ]
  },
  {
    id: 3, name: 'Profa. Renata',
    disciplinas: [
      { nome: 'Estrutura de Dados', curso: 'ADS', semestre: '2º Semestre' },
      { nome: 'Engenharia de Software', curso: 'ADS', semestre: '4º Semestre' }
    ]
  }
];

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState<string | number>('home');

  const renderizarConteudo = () => {
    if (paginaAtual === 'home') return <Home />;
    const prof = PROFESSORES.find(p => p.id === paginaAtual);
    return prof ? <Professor prof={prof} /> : <Home />;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <nav className="bg-slate-800 text-white p-4 flex gap-6 shadow-md">
        <button onClick={() => setPaginaAtual('home')} className="hover:text-blue-300 font-bold transition">Início</button>
        {PROFESSORES.map(p => (
          <button key={p.id} onClick={() => setPaginaAtual(p.id)} className="hover:text-blue-300 transition">
            {p.name}
          </button>
        ))}
      </nav>
      <main className="p-8 max-w-4xl mx-auto">
        {renderizarConteudo()}
      </main>
    </div>
  );
}

function Home() {
  return (
    <div className="bg-white p-8 rounded shadow text-center">
      <h1 className="text-3xl font-bold mb-4">Portal de Professores</h1>
      <p className="text-gray-600">Selecione um professor no menu acima para ver suas disciplinas e entrar em contato.</p>
    </div>
  );
}

function Professor({ prof }: { prof: ProfessorData }) {
  const [form, setForm] = useState<ContatoForm>({ nome: '', assunto: '', mensagem: '' });
  const [modalData, setModalData] = useState<ContatoForm | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalData(form);
    setForm({ nome: '', assunto: '', mensagem: '' });
  };

  return (
    <div className="bg-white p-6 rounded shadow animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">{prof.name}</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-slate-700">Disciplinas Lecionadas</h3>
        <ul className="space-y-2">
          {prof.disciplinas.map((disc, i) => (
            <li key={i} className="bg-slate-50 p-3 rounded border border-slate-100">
              <strong>{disc.nome}</strong> — {disc.curso} <span className="text-sm text-gray-500">({disc.semestre})</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-slate-700">Entrar em Contato</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input required type="text" placeholder="Nome do Aluno" className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
          <input required type="text" placeholder="Assunto" className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.assunto} onChange={e => setForm({...form, assunto: e.target.value})} />
          <textarea required placeholder="Sua Mensagem" rows={4} className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={form.mensagem} onChange={e => setForm({...form, mensagem: e.target.value})} />
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition self-start">
            Enviar Mensagem
          </button>
        </form>
      </div>

      {modalData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-green-600 mb-4">Contato Enviado!</h3>
            <div className="space-y-2 text-gray-700 mb-6">
              <p><strong>Nome:</strong> {modalData.nome}</p>
              <p><strong>Assunto:</strong> {modalData.assunto}</p>
              <p className="break-words"><strong>Mensagem:</strong> {modalData.mensagem}</p>
            </div>
            <button onClick={() => setModalData(null)} className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 transition">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}