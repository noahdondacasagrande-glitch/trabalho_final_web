import logo from "../assets/images/logo.png";
import google_logo from "../assets/images/google_logo.png";
import email from "../assets/images/email_logo.png";
import oculto from "../assets/images/oculto.png";
import {Link} from "react-router-dom"

const Login = () => {

    return (
        <div className="corpo-login">

            <div className="login-header">
                <img src={logo} alt="Logo SHARK3D" />
                <h1>SHARK3D</h1>
            </div>

            <div className="formulario-conta">

                <div className="titulo-login">
                    <p>Acessar sua conta</p>
                </div>

                <div className="escolher-entrada-conta">
                    
                        <div className="g_id_onload"
                            data-client_id="YOUR_GOOGLE_CLIENT_ID"
                            data-context="signin"
                            data-ux_mode="redirect"
                            data-login_uri="https://your.domain/your_login_endpoint"
                            data-itp_support="true">
                        </div>

                        <div className="g_id_signin"
                            data-type="standard"
                            data-shape="rectangular"
                            data-theme="outline"
                            data-text="signin_with"
                            data-size="large"
                            data-logo_alignment="left">
                        </div>


                    <div className="entrar-email">
                        <img src={email} alt="E-mail" />
                        <p>entrar com email</p>
                    </div>
                </div>

                <div className="divisoria">
                    <hr className="linha-esquerda" />
                    <p>ou</p>
                    <hr className="linha-direita" />
                </div>

                <div className="conteudo-conta-login">
                    <div className="formulario-email">
                        <label htmlFor="email">CPF, CNPJ ou Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="CPF, CNPJ ou Email"
                        />
                    </div>

                    <div className="formulario-senha">
                        <label htmlFor="senha">Senha</label>
                        <div className="campo-senha">
                            <input
                                type="password"
                                id="senha"
                                placeholder="Senha"
                            />
                            <img src={oculto} alt="Ocultar senha" />
                        </div>
                    </div>


                    <div className="botao-entrar">
                        <Link to="/produtos">
                            <button >Entrar</button>
                        </Link>
                        
                    </div>

                    <div className="link-cadastro">
                        <a href="/cadastro">
                            Não tem uma conta? Cadastre-se
                        </a>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Login;