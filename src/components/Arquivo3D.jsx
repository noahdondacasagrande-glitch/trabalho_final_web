
import { useState } from "react";

function Arquivo3D({ onArquivoSelecionado }) {
    const [arquivo, setArquivo] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function selecionarArquivo(event) {
        const file = event.target.files?.[0];

        if (!file) return;

        const extensoes = [".stl", ".obj", ".3mf"];
        const nome = file.name.toLowerCase();
        const extensaoValida = extensoes.some(ext =>
            nome.endsWith(ext)
        );

        if (!extensaoValida) {
            setMensagem("Selecione um arquivo STL, OBJ ou 3MF.");
            setArquivo(null);
            onArquivoSelecionado(null);
            event.target.value = "";
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            setMensagem("O arquivo deve ter no máximo 50 MB.");
            setArquivo(null);
            onArquivoSelecionado(null);
            event.target.value = "";
            return;
        }

        setArquivo(file);
        setMensagem("Modelo selecionado. Pronto para enviar.");
        onArquivoSelecionado(file);
    }

    async function enviarArquivo() {
        if (!arquivo) {
            setMensagem("Selecione um modelo primeiro.");
            return;
        }

        const dados = new FormData();
        dados.append("modelo", arquivo);

        setCarregando(true);
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
                `${resultado.mensagem} Arquivo: ${resultado.nomeOriginal}`
            );
        } catch (erro) {
            setMensagem(
                `Erro no envio: ${erro.message}. Confira se o backend está rodando.`
            );
        } finally {
            setCarregando(false);
        }
    }

    return (
        <section>
            <h2>Enviar modelo 3D</h2>

            <input
                type="file"
                accept=".stl,.obj,.3mf"
                onChange={selecionarArquivo}
            />

            {arquivo && (
                <p>
                    Arquivo: {arquivo.name}
                    <br />
                    Tamanho: {(arquivo.size / 1024 / 1024).toFixed(2)} MB
                </p>
            )}

            <button
                type="button"
                onClick={enviarArquivo}
                disabled={!arquivo || carregando}
            >
                {carregando ? "Enviando..." : "Enviar e processar"}
            </button>

            <p role="status">{mensagem}</p>
        </section>
    );
}

export default Arquivo3D;
