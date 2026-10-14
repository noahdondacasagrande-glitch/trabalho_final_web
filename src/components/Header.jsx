import {Link} from 'react-router-dom';
import login from '../assets/images/login.png'
import detalhes from '../assets/images/detalhes.png'
import lupa from '../assets/images/Search.png'

const Header = () => {
    return(
        <div className='header'>
            <a className='Logo' href="/Area_cliente">
                <h1>LOGO</h1>
                {/* <img src="" alt="" /> */}
            </a>

            <div className='separador-header-direita'>
                <div className='pesquisa'>
                    <label htmlFor="dados_pesquisa"></label>
                    <input type="text" className='dados_pesquisa_com_icone' placeholder='Pesquisar' />
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