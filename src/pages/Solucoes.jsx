import Header from "../components/Header";
import { Link } from "react-router-dom"

const Solucoes = () => {
    
    return (
        <div className="corpo-solucoes">
            <Header />

            <div className="texto-solucoes">
                <div className="titulo-solucoes">
                    <p>Problemas e resoluções encontrados </p>

                </div>
                <div className="paragrafos-solucoes">
                    <div className="paragrafo1-solucoes">
                        <p> O problema presente na produção de elementos 3D, são os obstáculos para encontrar uma distribuidora, produtora, de peças e instrumentos centralizada e confiável, que permita aos clientes ter a certeza que seus pedidos serão realizados com maestria e precisão .</p>      
                    </div>
                    <div className="paragrafo2-solucoes">
                        <p>	E nessa realidade de incerteza e pouca credibilidade que surge o Shar3D, uma empresa que busca excelência e  construir um relacionamento a longo prazo baseado na confiança mútua.Dispondo de uma ampla gama de recursos e opções, a Shar3D permite o requerimento de diferentes cotações de fornecedores antes de fechar um negócio, além de  centralizar o canal de negociação para obter condições comerciais exclusivas, transformando a incerteza do mercado em previsibilidade financeira.Possuindo um site com uma interface intuitiva, permitindo o upload de projetos ou compra de produtos prontos.</p>
                    </div>
                </div>

            </div>
            <div className="footer-solucoes">
                <Link to="/sobre" className="footer-1-solucoes">
                    <p>objetivo da empresa</p>
                </Link>
                <Link to="/detalhes" className="footer-2-solucoes">
                    <p>Público alvo</p>
                </Link>
            </div>
        </div>
    );
};

export default Solucoes;