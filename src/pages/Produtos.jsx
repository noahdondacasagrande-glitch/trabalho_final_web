import Header from "../components/Header";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"
import carrinho from "../assets/images/carrinho.png"
import detalhes from "../assets/images/detalhes.png";
import login from "../assets/images/login.png";
import Card from "../components/Card_objeto3D"

const Produtos = () => {
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
                            <input id="dados_pesquisa" type="text" className="dados_pesquisa_com_icone" placeholder="Pesquisar"/>
                        </div>
                        <Link to="/carrinho">
                            <img src={carrinho} alt="" />
                        </Link>
                        <Link to="/detalhes"className="FAQ"aria-label="Detalhes">
                            <img src={detalhes} alt="Detalhes" />
                        </Link>

                        <Link to="/login" className="login" aria-label="Login">
                            <img src={login} alt="Login" />
                        </Link>
                    </div>
                </div> 
            </div>
            <div className="produtos-cards">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div className="fazer-upload">
                    <Arquivo3D onArquivoSelecionado={setArquivo} />
                    <Visualizador3D arquivo={arquivo} />
            </div>
            <div className="footer-produtos">
                <Link to="/solucoes" className="produtos-para-solucoes">
                    Problemas e resoluções encontrados 
                </Link>
                <Link to="/sobre" className="produtos-para-sobre">
                    Objetivo da empresa
                </Link>
                <Link  to="/detalhes" className="produtos-para-detalhes">
                    Público alvo
                </Link>

            </div>
        </div>
    );
};

export default Produtos;