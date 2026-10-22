import { href } from "react-router-dom";
import Header from "../components/Header";

const Fale_Conosco = () => {
    
    return (
        <div className="corpo-Fale_Conosco">
            <Header />

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
                    <label htmlFor=""></label>
                    <input type="text" placeholder="Escreva..." />
                </div>
                <div className="botao-nos-enviar">
                    <button onClick={enviar_mensagem}>Enviar</button>
                </div>

            </div>
        </div>
    );
};

export default Fale_Conosco;