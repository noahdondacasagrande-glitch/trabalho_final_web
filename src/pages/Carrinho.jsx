
import Header from "../components/Header";

const Carrinho = () => {
    
    return (
        <div className="corpo-carrinho">
            <Header />
            <div className="coisas-carrinho">
                <div className="area-produtos-carrinho">
                    <div className="titulo-carrinho">
                        <p>Seu carrinho:</p>
                    </div>
                    <div className="botao-carrinho-enviar">
                        <button>PAGAR</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Carrinho;