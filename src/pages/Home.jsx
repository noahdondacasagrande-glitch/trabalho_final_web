
import { useState } from "react";


function Home() {
    const [arquivo, setArquivo] = useState(null);

    return (
        <>
            <div className="home">
                <div className="header-home">
                    <div className="fazer_cadastro">
                        <a href="/cadastro">
                            <h1>CADASTRO</h1>
                        </a>
                        
                    </div>
                    <div className="fazer_login">
                        <a href="/login">
                            <h1>LOGIN</h1>
                        </a>
                        
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Home;
