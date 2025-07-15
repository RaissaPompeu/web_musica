import React, { useState } from 'react';

function MusicaForm({ onAdicionar }) {
  const [form, setForm] = useState({
    nome: '',
    cantor: '',
    estilo: ''
  });

  const atualizar = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const enviar = e => {
    e.preventDefault();
    onAdicionar(form);
    setForm({ nome: '', cantor: '', estilo: '' });
  };

  return (
    <form onSubmit={enviar} style={{ marginBottom: '20px' }}>
      <input name="nome" placeholder="Nome da música" value={form.nome} onChange={atualizar} required />
      <input name="cantor" placeholder="Cantor" value={form.cantor} onChange={atualizar} required />
      <input name="estilo" placeholder="Estilo" value={form.estilo} onChange={atualizar} required />
      <button type="submit">Adicionar Música</button>
    </form>
  );
}

export default MusicaForm;
