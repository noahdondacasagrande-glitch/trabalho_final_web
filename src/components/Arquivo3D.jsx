
import { useState } from "react";

function UploadModelo() {
  const [arquivo, setArquivo] = useState(null);

  function selecionarArquivo(event) {
    const file = event.target.files[0];

    if (!file) return;

    const formatos = [".stl", ".obj", ".3mf"];
    const nome = file.name.toLowerCase();

    if (!formatos.some(formato => nome.endsWith(formato))) {
      alert("Selecione um arquivo STL, OBJ ou 3MF.");
      return;
    }

    setArquivo(file);

    console.log("Arquivo selecionado:", file.name);
    console.log("Tamanho em bytes:", file.size);
  }

  return (
    <div>
      <h2>Enviar modelo 3D</h2>

      <input
        type="file"
        accept=".stl,.obj,.3mf"
        onChange={selecionarArquivo}
      />

      {arquivo && (
        <p>Arquivo selecionado: {arquivo.name}</p>
      )}
    </div>
  );
}

export default UploadModelo;
