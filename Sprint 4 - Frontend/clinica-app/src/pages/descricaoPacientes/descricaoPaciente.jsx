import { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import '../../assets/css/style.css';

import Header from '../../components/header';
import Rodape from '../../components/rodape';

import { FaChevronCircleLeft } from "react-icons/fa"

export default class descricaoPaciente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Consulta: []
        };
    }

    //Listar as minhas consultas


    buscarConsultas = () => {
        axios('http://localhost:5000/api/paciente/minhasConsultas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })

            .then((resposta) => {

                let id = localStorage.getItem('usuario-consulta')

                if (resposta.status === 200) {

                    resposta.data.map((consulta) => {

                        if (consulta.idConsulta == id) {
                            return (
                                this.setState({ Consulta: [consulta] })
                            );
                        }

                    });
                }
            })
            .catch((erro) => console.log(erro));
    };

    componentDidMount() {
        this.buscarConsultas();
    }

    render() {
        return (
            <div>
                <main>
                    <Header />
                    <section className="container_descricao">
                        <div className="box_descricao">
                            <div className="box_consulta_voltar">
                                <div className="voltar_consulta">
                                    <Link to="/consultaPaciente"><FaChevronCircleLeft size={50} /></Link>
                                    <Link to="/consultaPaciente">Voltar</Link>
                                </div>
                                <div>
                                    <h1 className="titulo_consulta">Consulta</h1>
                                    <hr className="barra_consulta" />
                                </div>
                            </div>

                            {this.state.Consulta.map((consulta) => {
                                return (
                                    <div className="dados_descricao" key={consulta.idConsulta}>
                                        <div className="primeira_coluna_descricao">
                                            <div className="fundo_dados">
                                                <span className="descricao">N° Consulta: <p className="dados">{consulta.idConsulta}</p> </span>
                                            </div>
                                            <div className="fundo_dados">
                                                <span className="descricao">Nome Médico: <p className="dados">{consulta.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}</p> </span>
                                            </div>
                                            <div className="fundo_dados">
                                                <span className="descricao">Data da Consulta: <p className="dados">{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: false
                                                }).format(new Date(consulta.dataConsulta))}</p> </span>
                                            </div>
                                            <div className="fundo_dados">
                                                <span className="descricao">Situação: <p className="dados">{consulta.idSituacaoNavigation.nomeSituacao}</p> </span>
                                            </div>
                                        </div>
                                        <div className="segunda_coluna_descricao">
                                            <div className="fundo_dados">
                                                <span className="descricao">Nome Paciente: <p className="dados">{consulta.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</p></span>
                                            </div>
                                            <div className="fundo_dados_descricao">
                                                <span className="descricao_consulta">Descrição: <p className="dados">{consulta.descricao}</p> </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </section>
                    <Rodape />
                </main>
            </div>
        );
    }

}