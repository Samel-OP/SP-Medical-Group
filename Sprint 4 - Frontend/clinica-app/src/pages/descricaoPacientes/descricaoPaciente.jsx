import { Component } from 'react';
import axios from 'axios';

import '../../assets/css/style.css';

import Header from '../../components/header';
import Rodape from '../../components/rodape';

import { FaChevronCircleLeft } from "react-icons/fa"
import consultaPaciente from '../consultaPacientes/consultaPaciente';

export default class descricaoPaciente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consultaPaciente: [],
            listaSituacao: [],
            listaPacientes: [],
            listaMedicos: []
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
                if (resposta.status === 200) {
                    this.setState({ listaMinhasConsultas: resposta.data });
                }
            })
            .catch((erro) => console.log(erro));
    };

    //Listar pacientes
    buscarPacientes = () => {
        axios('http://localhost:5000/api/paciente', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaPacientes: resposta.data });
                    // console.log(resposta.data);
                    // console.log(this.state.listaPacientes)
                }
            })
            .catch((erro) => console.log(erro));
    }

    //Listar médicos
    buscarMedicos = () => {
        axios('http://localhost:5000/api/medico', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaMedicos: resposta.data });
                }
            })
            .catch((erro) => console.log(erro));
    }

    componentDidMount() {
        this.buscarConsultas();
        this.buscarPacientes();
        this.buscarMedicos();
    }

    render() {
        return (
            <div>
                <main>
                    <Header />
                    <section class="container_descricao">
                        <div class="box_descricao">
                            <div class="box_consulta_voltar">
                                <div class="voltar_consulta">
                                    <a href="#"><FaChevronCircleLeft size={50} /></a>
                                    <a href="#">Voltar</a>
                                </div>
                                <h1 class="titulo_consulta">Consulta</h1>
                            </div>
                            <hr class="barra_consulta" />


                            {consultaPaciente.map((consulta) => {
                                return (
                                    <div class="dados_descricao">
                                        <div class="primeira_coluna_descricao">
                                            <div class="fundo_dados">
                                                <span class="descricao">N° Consulta: <p>{this.state.listaConsultas.idConsulta}</p> </span>
                                            </div>
                                            <div class="fundo_dados">
                                                <span class="descricao">Nome Médico: </span>
                                            </div>
                                            <div class="fundo_dados">
                                                <span class="descricao">Data da Consulta: </span>
                                            </div>
                                            <div class="fundo_dados">
                                                <span class="descricao">Situação: </span>
                                            </div>
                                        </div>
                                        <div class="segunda_coluna_descricao">
                                            <div class="fundo_dados">
                                                <span class="descricao">Nome Paciente: <p>{consulta.idConsulta.nomePaciente}</p></span>
                                            </div>
                                            <div class="fundo_dados_descricao">
                                                <span class="descricao_consulta">Descrição: </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    <Rodape />
                </main>
            </div>
        );
    }

}