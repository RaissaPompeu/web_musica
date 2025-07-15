import React from 'react';

function MusicaLista({ musicas }) {
  if (musicas.length === 0) return <p>Nenhuma música cadastrada ainda.</p>;

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cantor</th>
          <th>Estilo</th>
        </tr>
      </thead>
      <tbody>
        {musicas.map((musica, index) => (
          <tr key={index}>
            <td>{musica.nome}</td>
            <td>{musica.cantor}</td>
            <td>{musica.estilo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MusicaLista;
