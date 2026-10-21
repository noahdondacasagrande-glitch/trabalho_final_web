
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
    return (
        <header className="header">
            <Link to="/area_cliente" className="logo">
                <img src={logo} alt="Logo SHARK3D" />
                <p>SHARK3D</p>
            </Link>
        </header>
    );
};

export default Header;