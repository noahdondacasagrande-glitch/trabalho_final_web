import { useState } from "react";
import Header from "../components/Header";

const Fale_Conosco = () => {
    const [mensagem, setMensagem] = useState("");

    const contato = "5541999999999";

    function mandar() {
        if (!mensagem.trim()) return;

        const link = `https://wa.me/${contato}?text=${encodeURIComponent(mensagem)}`;
        window.open(link, "_blank");
    }

    return (
        <div className="corpo-fale_conosco">
            <Header />
            <div className="coisas-fale_conosco">
                <div className="texto-fale_conosco">
                    <div className="titulo-fale_conosco">
                        <p>Fale com nossa equipe</p>
                    </div>
                </div>
                <div className="caixa-fala">
                    <div className="subtitulo-fale_conosco">
                        <p>Seu tópico de ajuda</p>
                    </div>
                    <div className="mensagem-para-nos">
                        <input
                            placeholder="Escreva..."
                            className="input-fale"
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                        />
                    </div>
                    <div className="botao-nos-enviar">
                        <button className="nos-enviar-botao" onClick={mandar}>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fale_Conosco;