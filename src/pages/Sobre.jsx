import Header from "../components/Header";
import { Link } from "react-router-dom"
const Sobre = () => {
    
    return (
        <div className="corpo-sobre">
            <Header />
            <div className="texto-sobre2">
                <div className="titulo-sobre2">
                    <h1>Objetivo da impresa</h1>
                </div>
                <div className="paragrafo-sobre2">
                    <p>Nossa empresa tem o objetivo de ativar a criatividade das pessoas com impressões 3D, deixando cada peça com um toque de seu criador. A nossa empresa tenta entregar os pedidos o mais rápido possível, já que temos intenção de vender para engenheiros, profissionais que utilizam impressão 3D em seus trabalhos e negócios e adolescentes que estão desenvolvendo interesse pela área, buscamos oferecer produtos com preços acessíveis para tornar a impressão 3D mais prática e acessível para nossos clientes.</p>
                </div>
            </div>
            <div className="footer-sobre2">
                <Link to="/solucoes" className="footer-1-sobre">
                    <p>Problemas e resoluções encontrados </p>
                </Link>
                <Link to="/detalhes" className="footer-2-sobre">
                    <p>Público alvo</p>
                </Link>

            </div>
        </div>
    );
};

export default Sobre;