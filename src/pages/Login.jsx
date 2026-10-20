import logo from "../assets/images/logo.png";

const Login = () => {
    function login(){
        var email = document.getElementById("email").value 
        var senha = document.getElementById("senha").value 

        const usuario = {
            nome : email,
            senha : senha
        };
        localStorage.setItem('usuarioConfig', JSON.stringify(usuario));
                 
    }
    
    return (
        <div className="corpo-login"> 

            <div className="login-header">
                <img src={logo} alt="" />
                <h1>SHARK3D</h1>
            </div>

            <div className="formulario-conta">

                <div className="titulo-login">
                    <p>Acessar sua conta</p>
                </div>
                <div className="escolher-entrada-conta">
                    <div className="entrar-google">
                      
                        <p>entrar com google</p>
                    </div>
                    <div className="entrar-email">
                        
                        <p>entrar com email</p>
                    </div>
                </div>

                <div className="divisoria">
                    <hr className="linha-esquerda"/>
                    <p>ou</p>
                    <hr className="linha-direita"/>
                </div>
                <div className="conteudo-conta-login">
                    <div className="formulario-email">
                        <label htmlFor="email">CPF, CNPJ ou Email</label>
                        <input type="email" id="email" placeholder="CPF, CNPJ ou Email" />
                    </div>
                    <div className="formulario-senha">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" placeholder="Senha" /> 
                       
                    </div>                
                    <div className="esqueci-senha">
                        <p>Esqueci minha senha</p>
                    </div>
                    
                    <div className="botao-entrar">
                        <button onClick={login}>Entrar</button>
                    </div>
                    <div className="link-cadastro">
                        <a href="/cadastro">Não tem uma conta? Cadastre-se</a>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Login;
