import React from "react";
import logo from '../assets/css/img/SP_MEDICAL_GROUP-removebg-preview.png'

export default function Header() {

    return (
        <header className="header_pages">
            <img className="logo_header" src={logo} alt="logo" />

            <nav className ="links_header">
            <a className ="link" href="#">Home</a>
            <a className ="link" href="#">Consultas</a>
            <a className ="link" href="#">Contato</a>
            <a className ="link" href="#">Login</a>
            </nav>
        </header>
    )
}