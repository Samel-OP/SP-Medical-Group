import React from "react";

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
                <img src="css/img/instagram.png" alt="logo Instagram" />
                <img src="css/img/facebook.png" alt="logo Facebook" />
            </div>
        </div>
    </footer>
    )
}