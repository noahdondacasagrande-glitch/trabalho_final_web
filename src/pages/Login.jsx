import Header from "../components/Header";


const Login = () => {
    
    return (
        <div className="corpo-login"> 
            
            <div className="caixa-login">
                <h1>Cadastrar</h1>
                <div className="email">
                    <label htmlFor=""></label>
                    <input type="email" />
                </div>
                <div className="senha">
                    <label htmlFor=""></label>
                    <input type="password" />
                </div>

                <button>Cadastrar</button>

            </div>
        </div>
    );
};

export default Login;
