import { useState } from "react";
import Header from "../components/Header";
import Arquivo3D from "../components/Arquivo3D";
import Visualizador3D from "../components/Visualizador3D";

const Area_Cliente = () => {
    

    return (
        <div className="area-cliente">
            <Header />
            <Visualizador3D />
        </div>
    );
};

export default Area_Cliente;    