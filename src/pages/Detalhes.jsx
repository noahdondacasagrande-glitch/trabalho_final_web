import Header from "../components/Header";
import { Link } from "react-router-dom"


const Detalhes = () => {
   
    return (
        <div className="corpo-detalhes">
            <Header />
            <div texto-detalhes>
                <div className="titulo-detalhes">
                    <p>Público alvo</p>
                </div>
                <div className="paragrafos-detalhes">
                  <div className="paragrafo1-detalhes">
                    <p>Nosso público alvo são adolescentes, adultos e pessoas que tenham interesse em engenharia e que tenham interesse em  máquinas 3D. </p>
                  </div>
                  <div className="paragrafo2-detalhes">
                    <p>Pq esse é o nosso público alvo?</p>
                  </div>
                  <div className="paragrafo3-detalhes"> 
                    <p>Esse é nosso público alvo por conta da nossa empresa ser voltada para maquinas 3D e alguns download de peças 3D, muitos adolescentes criaram interesses por impressões em 3D ao longo desses anos, e a nossa empresa vende download de impressões 3D, já os adultos têm interesse nas impressoras 3D por ser algo que é útil nos seus negócio, e a nossa empresa vende peças prontas de impressão 3D, a Shark3D é voltada para impressões de robôs para engenharia e a Shark3D faz peças de robô individuais e grupos de  peças diferentes umas das outras. </p>
                  </div>
                </div>
            </div>
            <div className="footer-detalhes">
                <Link to="/solucoes" className="footer-1-sobre">
                    <p>Problemas e resoluções encontrados </p>
                </Link>
                <Link to="/sobre" className="footer-2-sobre">
                    <p>Objetivo da empresa</p>
                </Link>
            </div>

        </div>
    );
};

export default Detalhes;