
import login from '../assets/images/login.png'
import detalhes from '../assets/images/detalhes.png'
import lupa from '../assets/images/Search.png'
import { Link, Routes, Route } from 'react-router-dom';
import "../styles/Header.css";
import logo from '../assets/images/logo.png'

const Header = () => {
    return(
        <div className='header'>

            <Link to="/area_cliente" className='Logo'>
                <img src={logo} alt="" />
            </Link>

            <div className='separador-header-direita'>
                <div className='pesquisa'>
                    <label htmlFor="dados_pesquisa">Pesquisar</label>
                    <input
                        id="dados_pesquisa"
                        type="text"
                        className="dados_pesquisa_com_icone"
                        placeholder="Pesquisar"
                    />
                </div>
                <Link to="/detalhes" className='FAQ'>
                    <img src={detalhes} alt="" />
                </Link>
                <Link to="/login" className='login'>
                    <img src={login} alt="" />       
                </Link>
            </div>
        </div>
    );
};

export default Header;