import React from "react";
import logo from '../assets/css/img/SP_MEDICAL_GROUP-removebg-preview.png'

export default function Header() {

    return (
        <header className="header_pages">
            <img class="logo_header" src={logo} alt="logo" />

            <nav class ="links_header">
            <a class ="link" href="#">Home</a>
            <a class ="link" href="#">Consultas</a>
            <a class ="link" href="#">Contato</a>
            <a class ="link" href="#">Login</a>
            </nav>
        </header>
    )
}