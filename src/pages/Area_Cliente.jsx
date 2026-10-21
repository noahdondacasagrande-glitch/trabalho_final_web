
import Header from "../components/Header";
import { Link } from "react-router-dom";

import detalhes from "../assets/images/detalhes.png";
import login from "../assets/images/login.png";

const Area_Cliente = () => {
    return (
        <div className="area-cliente">
            <div className="header">
                <Header />

                <div className="separador-header-direita">
                    <div className="pesquisa">
                        <label htmlFor="dados_pesquisa">
                            Pesquisar
                        </label>

                        <input
                            id="dados_pesquisa"
                            type="text"
                            className="dados_pesquisa_com_icone"
                            placeholder="Pesquisar"
                        />
                    </div>

                    <Link
                        to="/detalhes"
                        className="FAQ"
                        aria-label="Detalhes"
                    >
                        <img src={detalhes} alt="Detalhes" />
                    </Link>

                    <Link
                        to="/login"
                        className="login"
                        aria-label="Login"
                    >
                        <img src={login} alt="Login" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Area_Cliente;
