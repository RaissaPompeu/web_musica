'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [musicas, setMusicas] = useState([]);
  const [form, setForm] = useState({ nome: '', cantor: '', estilo: '' });

  const carregarMusicas = () => {
    axios.get('http://localhost:5000/listar_musica')
      .then(res => setMusicas(res.data.detalhes))
      .catch(err => console.error('Erro ao carregar:', err));
  };

  const enviarMusica = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/incluir_musica', form);
    setForm({ nome: '', cantor: '', estilo: '' });
    carregarMusicas();
  };

  useEffect(() => {
    carregarMusicas();
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Cadastro de Músicas</h1>
      <hr />
      <br />

      <form onSubmit={enviarMusica}>
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
        />
        <input
          placeholder="Cantor"
          value={form.cantor}
          onChange={e => setForm({ ...form, cantor: e.target.value })}
        />
        <input
          placeholder="Estilo"
          value={form.estilo}
          onChange={e => setForm({ ...form, estilo: e.target.value })}
        />
        <button type="submit">Adicionar</button>
      </form>
      <br />
      <h1>Músicas Cadastradas</h1>
      <br />

      <ul>
        {musicas.map((m, i) => (
          <li key={i}>
            <strong>{m.nome}</strong> - {m.cantor} ({m.estilo})
          </li>
        ))}
      </ul>
    </main>
  );
}
