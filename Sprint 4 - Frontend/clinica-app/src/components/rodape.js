import React from "react";

import facebook from '../assets/css/img/facebook.png'
import instagram from '../assets/css/img/instagram.png'

export default function Rodape(){

    return(
        <footer>
        <div className="atendimento">
            <span>Central de Atendimento</span>
            <a href="">Numero</a>
        </div>
        <div className="fale_conosco">
            <span>Fale Conosco</span>
            <a href="">Email</a>
        </div>
        <span className="copyright">© 2021 SP Medical Group</span>
        <div className="redes_sociais">
            <span>Acompanhe nós em nossas redes sociais</span>
            <div className="logos_redes_sociais">
                <img src={instagram} alt="logo Instagram" />
                <img src={facebook} alt="logo Facebook" />
            </div>
        </div>
    </footer>
    )
}