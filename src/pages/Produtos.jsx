
import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";
import carrinho from "../assets/images/carrinho.png";
import detalhes from "../assets/images/detalhes.png";
import login from "../assets/images/login.png";
import fala from "../assets/images/fala.png"

import Card from "../components/Card_objeto3D";
import Arquivo3D from "../components/Arquivo3D.jsx";
import Visualizador3D from "../components/Visualizador3D.jsx";

const Produtos = () => {
    const [arquivo, setArquivo] = useState(null);

    return (
        <div className="corpo-produtos">
            <div className="header-produtos">
                <div className="header">
                    <Link to="/produtos" className="logo">
                        <img src={logo} alt="Logo SHARK3D" />
                        <p>SHARK3D</p>
                    </Link>

                    <div className="separador-header-direita">
                        <div className="pesquisa">
                            <label htmlFor="dados_pesquisa"></label>
                            <input
                                id="dados_pesquisa"
                                type="text"
                                className="dados_pesquisa_com_icone"
                                placeholder="Pesquisar"
                            />
                        </div>
                        <Link to="/fale_conosco" className="fala-imagem">
                            <img src={fala} alt="" />
                        </Link>

                        <Link to="/carrinho">
                            <img src={carrinho} alt="Carrinho" />
                        </Link>

                        <Link
                            to="/detalhes"
                            className="FAQ"
                            aria-label="Detalhes"
                        >
                            <img src={detalhes} alt="Detalhes" />
                        </Link>

                        <Link
                            to="/area_cliente"
                            className="login"
                            aria-label="Login"
                        >
                            <img src={login} alt="Login" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="produtos-cards">
                <div className="faixa1-produtos">
                    <Card  className="card1"/>
                    <Card  className="card2" />
                </div>
                <div className="faixa2-produtos">
                    <Card  className="card3" />
                    <Card  className="card4" />
                </div>
                <div className="faixa3-produtos">
                    <Card className="card5" />
                    <Card  className="card6" />
                </div>
                <div className="faixa4-produtos">
                    <Card className="card7" />
                    <Card className="card8" />
                </div>
            </div>

            <div className="fazer-upload">
                <Arquivo3D
                    onArquivoSelecionado={setArquivo}
                />

                <Visualizador3D arquivo={arquivo} />
            </div>

            <div className="footer-produtos">
                <Link
                    to="/solucoes"
                    className="produtos-para-solucoes"
                >
                    Problemas e resoluções encontrados
                </Link>

                <Link
                    to="/sobre"
                    className="produtos-para-sobre"
                >
                    Objetivo da empresa
                </Link>

                <Link
                    to="/detalhes"
                    className="produtos-para-detalhes"
                >
                    Público alvo
                </Link>
            </div>
        </div>
    );
};

export default Produtos;
