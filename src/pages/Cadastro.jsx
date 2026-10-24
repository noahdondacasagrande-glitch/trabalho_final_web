import { Link } from "react-router-dom";
import Header from "../components/Header";



const Cadastro = () => {
    
    return (
        <div className="corpo-cadastro"> 
            <Header />
            <div className="coisas-cadastro">
                <div className="titulo-cadastro">
                    <h1>Vamos criar sua conta</h1>
                    <p>Os campos abaixo são essenciais paa criarmos sua conta SHARK3D</p>
                </div>
                <div className="formulario-cadastro">
                    <div className="linha-superior-cadastro">
                        <div className="informe-CPF-cadastro">
                            <label htmlFor="">Informe seu CPF ou CNPJ</label>
                            <input type="nunber" placeholder="000.000.000-00"/>
                        </div>
                        <div className="informe-telefone-cadastro">
                            <label htmlFor="">Telefone celular</label>
                            <input type="tel"  placeholder="(+55) 00 000000000"/>
                        </div>
                    </div>
                    <div className="linha-secundaria-cadastro">
                        <div className="nome-cadastro">
                            <label htmlFor="">Nome</label>
                            <input type="text" placeholder="Nome"/>
                        </div>
                        <div className="sobrenome-cadastro">
                            <label htmlFor="">Sobrenome</label>
                            <input type="text" placeholder="Sobrenome" />
                        </div>
                    </div>
                    
                    <div className="criar-senha-cadastro">
                        <label htmlFor="">Criar senha</label>
                        <input type="text" placeholder="Criar senha" />
                    </div>
                    <div className="vai-volta-cadastro">
                        <Link to="/produtos"> 
                            <button>Continuar</button>
                        </Link>
                    <Link to="/">
                            <button>Voltar</button>
                    </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;