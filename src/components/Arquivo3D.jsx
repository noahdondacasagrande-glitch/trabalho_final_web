
import { useState } from "react";

function Arquivo3D() {
    const [arquivo, setArquivo] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [enviando, setEnviando] = useState(false);

    function selecionarArquivo(event) {
        const file = event.target.files[0];

        setMensagem("");
        setArquivo(null);

        if (!file) {
            return;
        }

        const formatosPermitidos = [".stl", ".obj", ".3mf"];
        const nome = file.name.toLowerCase();

        const formatoValido = formatosPermitidos.some(
            formato => nome.endsWith(formato)
        );

        if (!formatoValido) {
            setMensagem("Selecione um arquivo STL, OBJ ou 3MF.");
            event.target.value = "";
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            setMensagem("O arquivo deve ter no máximo 50 MB.");
            event.target.value = "";
            return;
        }

        setArquivo(file);
        setMensagem("Arquivo selecionado com sucesso.");
    }

    async function enviarArquivo() {
        if (!arquivo) {
            setMensagem("Selecione um arquivo antes de enviar.");
            return;
        }

        const dados = new FormData();
        dados.append("modelo", arquivo);

        setEnviando(true);
        setMensagem("Enviando arquivo...");

        try {
            const resposta = await fetch(
                "http://localhost:3001/api/modelos",
                {
                    method: "POST",
                    body: dados
                }
            );

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    resultado.erro || "Não foi possível enviar o arquivo."
                );
            }

            setMensagem(
                `Sucesso! ${resultado.arquivo} foi enviado.`
            );
        } catch (erro) {
            console.error("Erro no envio:", erro);

            setMensagem(
                "Erro ao enviar. Confira se o backend está funcionando."
            );
        } finally {
            setEnviando(false);
        }
    }

    return (
        <div>
            <h2>Enviar modelo 3D</h2>

            <input
                type="file"
                accept=".stl,.obj,.3mf"
                onChange={selecionarArquivo}
                disabled={enviando}
            />

            {arquivo && (
                <div>
                    <p>Arquivo: {arquivo.name}</p>
                    <p>
                        Tamanho: {(arquivo.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                </div>
            )}

            <button
                type="button"
                onClick={enviarArquivo}
                disabled={!arquivo || enviando}
            >
                {enviando ? "Enviando..." : "Enviar modelo"}
            </button>

            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default Arquivo3D;
