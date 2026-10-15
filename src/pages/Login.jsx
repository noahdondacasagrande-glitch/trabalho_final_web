import Header from "../components/Header";


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
            
            <div className="caixa-login">
                <h1>Login</h1>
                <div className="email">
                    <label htmlFor=""></label>
                    <input type="email" id="email" />
                </div>
                <div className="senha">
                    <label htmlFor=""></label>
                    <input type="password" id="senha" />
                </div>

                 <button class="cadastrado-usuario" onclick="login()">LOGIN</button>
            </div>
        </div>
    );
};

export default Login;
