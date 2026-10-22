
import Header from "../components/Header";
import { Link } from "react-router-dom";

import detalhes from "../assets/images/detalhes.png";
import login from "../assets/images/login.png";
import logo from "../assets/images/logo.png"
import carrinho from "../assets/images/carrinho.png"

const Area_Cliente = () => {
    return (
        <div className="area-cliente">
            <div className="header-area_cliente">
                <div className="logo-area_cliente">
                    <Link to="/produtos">
                        <img src={logo} alt="" />
                        <p>SHARK3D</p>
                    </Link>
                </div>
                <div className="mostrar-perfil">
                    <Link to="/sobre">
                        <img src={login} alt="" />
                        <p>Seu perfil</p>
                    </Link>
                    
                </div>
                <div className="separador-direita-area_cliente">
                    <Link to="/carrinho">
                        <img src={carrinho} alt="" />
                    </Link>
                    <Link to="/detalhes">
                        <img src={detalhes} alt="" />
                    </Link>
                </div>
            </div>
            <div className="titulo-area_cliente">
                <p>Dados pessoais</p>
            </div>
            <div className="formulario-area-cliente">
                <div className="area_cliente-CPF">
                     <p> CPF ou CNPJ</p>
                     <div className="caixa-CPF-cliente">
                        <p>000-000.000-00</p>
                     </div> 
                </div>
                <div className="nome-sobrenome-cliente">
                    <div className="cliente-nome">
                        <p>Nome:</p>
                    </div>
                    <div className="cliente-sobrenome">
                        <p>Sobrenome: </p>
                    </div>
                    
                </div>
                <div className="cliente-telefone">
                    <p>Telefone celular</p>
                </div>
            </div>
        </div>
    );
};

export default Area_Cliente;
