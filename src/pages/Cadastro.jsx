import Header from "../components/Header";



const Cadastro = () => {
    
    return (
        <div className="corpo-cadastro"> 
            
            <div className="caixa-cadastro">
                <h1>Cadastrar</h1>
                <div className="email">
                    <label htmlFor=""></label>
                    <input type="email"  placeholder="Exemplo123@gmail.com"/>
                </div>
                <div className="senha">
                    <label htmlFor=""></label>
                    <input type="password" />
                </div>

                <button >Cadastrar</button>

            </div>
        </div>
    );
};

export default Cadastro;