import {Link} from 'react-router-dom';

const Header = () => {
    return(
        <div className='header'>
            <a className='Logo' href="/">
                <p>LOGO</p>
            </a>
            <div className='pesquisa'>
                <label htmlFor="dados_pesquisa"></label>
                <input type="text" className='dados_pesquisa' />
            </div>
            <Link to="/detalhes" className='FAQ'>
                <p>DETALHES</p>
            </Link>
            <Link to="/login" className='login'>
                <p>LOGIN</p>          
            </Link>
        </div>

    );
};

export default Header;