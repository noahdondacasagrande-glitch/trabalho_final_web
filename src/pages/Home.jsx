
import { useState } from "react";
import logo from "../assets/images/logo.png"


function Home() {
    const [arquivo, setArquivo] = useState(null);

    return (
        <>
            <div className="home">
                <div className="header-home">
                    <div className="Logo">
                        <img src={logo} alt="" />
                        <p>SHARK3D</p>
                    </div>
                    <div className="fazer_login">
                        <a href="/login">
                            Fazer Login
                        </a>
                        
                    </div>
                </div>

                <div className="sobre">
                    <h1 className="titulo-sobre">Sobre nós</h1>
                    <div className="texto-sobre">
                        <p className="paragrafo1">Nossa empresa tem o objetivo de ativar a criatividade das pessoas com impressões 3D, deixando cada peça com um toque de seu criador. A nossa empresa tenta entregar os pedidos o mais rápido possível, já que temos intenção de vender para engenheiros, profissionais que utilizam impressão 3D em seus trabalhos e negócios e adolescentes que estão desenvolvendo interesse pela área, buscamos oferecer produtos com preços acessíveis para tornar a impressão 3D mais prática e acessível para nossos clientes.</p>
                        
                        <p className="paragrafo2">Nosso público alvo são adolescentes, adultos e pessoas que tenham interesse em engenharia e que tenham interesse em máquinas 3D.</p>
                    
                        <p className="paragrafo3">Pq esse é o nosso público alvo?</p>
                        <p className="paragrafo4">Esse é nosso público alvo por conta da nossa empresa ser voltada para maquinas 3D e alguns download de peças 3D, muitos adolescentes criaram interesses por impressões em 3D ao longo desses anos, e a nossa empresa vende download de impressões 3D, já os adultos têm interesse nas impressoras 3D por ser algo que é útil nos seus negócio, e a nossa empresa vende peças prontas de impressão 3D, a Shark3D é voltada para impressões de robôs para engenharia e a Shark3D faz peças de robô individuais e grupos de peças diferentes umas das outras.</p>
                        <p className="paragrafo5">E nessa realidade de incerteza e pouca credibilidade que surge o Shar3D, uma empresa que busca excelência e construir um relacionamento a longo prazo baseado na confiança mútua.Dispondo de uma ampla gama de recursos e opções, a Shar3D permite o requerimento de diferentes cotações de fornecedores antes de fechar um negócio, além de centralizar o canal de negociação para obter condições comerciais exclusivas, transformando a incerteza do mercado em previsibilidade financeira.Possuindo um site com uma interface intuitiva, permitindo o upload de projetos ou compra de produtos prontos.</p>
                        <p className="paragrafo6">	O problema presente na produção de elementos 3D, são os obstáculos para encontrar uma distribuidora, produtora, de peças e instrumentos centralizada e confiável, que permita aos clientes ter a certeza que seus pedidos serão realizados com maestria e precisão .</p>
                    </div>

                </div>
            </div>
            
        </>
    );
}

export default Home;
