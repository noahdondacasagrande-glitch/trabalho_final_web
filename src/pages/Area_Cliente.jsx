
import { useState } from "react";
import Header from "../components/Header";
import Arquivo3D from "../components/Arquivo3D";
import Visualizador3D from "../components/Visualizador3D";

const Area_Cliente = () => {
    const [arquivo, setArquivo] = useState(null);

    return (
        <div className="area-cliente">
            <Header />

            <main>
                <Arquivo3D
                    onArquivoSelecionado={setArquivo}
                />

                <div className="visualizador3d">
                    <Visualizador3D arquivo={arquivo} />
                </div>
            </main>
        </div>
    );
};

export default Area_Cliente;
