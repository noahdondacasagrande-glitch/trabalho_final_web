import { useState } from "react";

export default function Header(){
    const [menuAtivo, setMenuAtivo] = useState(false);

    const toggleMenu = () => {
        setMenuAtivo(!menuAtivo);
    };
    return(
        <>

        </>
    )
}