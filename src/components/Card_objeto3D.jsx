
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import caixa from "../assets/images/caixa.png"

const Card_objeto3D = () => {
    return (
        <div className="card_objeto3D">
            <div className="envelopar-card">
                <div className="um-card-menor">
                    <img src={caixa} alt="" />
                </div>
                <div className="falsa-descrição">
                    <div className="titulo-card-falso">

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Card_objeto3D;