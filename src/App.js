import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicaForm from './MusicaForm';
import MusicaLista from './MusicaLista';

function App() {
  const [musicas, setMusicas] = useState([]);

  const carregarMusicas = () => {
    axios.get('http://localhost:5000/listar_musica')
      .then(response => {
        if (response.data.resultado === "ok") {
          setMusicas(response.data.detalhes);
        } else {
          alert("Erro ao buscar músicas: " + response.data.detalhes);
        }
      })
      .catch(error => alert("Erro na requisição: " + error));
  };

  const adicionarMusica = (novaMusica) => {
    axios.post('http://localhost:5000/incluir_musica', novaMusica)
      .then(response => {
        if (response.data.resultado === "ok") {
          carregarMusicas(); // recarrega a lista
        } else {
          alert("Erro ao adicionar: " + response.data.detalhes);
        }
      })
      .catch(error => alert("Erro na requisição: " + error));
  };

  useEffect(() => {
    carregarMusicas();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>🎵 Cadastro de Músicas</h1>
      <MusicaForm onAdicionar={adicionarMusica} />
      <MusicaLista musicas={musicas} />
    </div>
  );
}

export default App;
