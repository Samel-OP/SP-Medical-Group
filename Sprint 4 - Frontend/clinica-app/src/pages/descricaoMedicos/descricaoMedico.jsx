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
            isLoading: false,
            Descricao: '',

            Consulta: []
        };
    }

    //Listar as minhas consultas


    buscarConsultas = () => {
        axios('http://localhost:5000/api/medico/minhasConsultas', {
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
                                this.setState({ Consulta: [consulta] }),
                                this.setState({ Descricao: consulta.descricao })
                            );
                        }

                    });
                }
            })
            .catch((erro) => console.log(erro));
    };

    atualizarDescricao = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        var id = localStorage.getItem('usuario-consulta')
        axios.patch('http://localhost:5000/api/consulta/' + id, { descricao: this.state.Descricao }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    console.log('Descrição atualizada!');
                    this.setState({ isLoading: false });
                }
            })
            .catch((erro) => {
                console.log(erro);
                this.setState({ isLoading: false });
            })
    }

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    };

    componentDidMount() {
        this.buscarConsultas();
    }

    render() {
        return (
            <div>
                <main>
                    <Header />
                    <section className="container_descricao_medico">
                        <div className="box_descricao">
                            <div className="box_titulo_voltar">
                                <div className="box_consulta_voltar">
                                    <div className="voltar_consulta">
                                        <Link to="/consultaMedico"><FaChevronCircleLeft size={50} /></Link>
                                        <Link to="/consultaMedico">Voltar</Link>
                                    </div>
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
                                            <form onSubmit={this.atualizarDescricao}>
                                                <div>
                                                    <textarea name="Descricao" onChange={this.atualizaStateCampo} value={this.state.Descricao} class="descricao_consulta_text"></textarea>
                                                </div>
                                                {this.state.isLoading === false && this.state.Descricao === '' && (
                                                    <button class="btn_atualizar_desabilitado" type="submit" disabled>
                                                        Insira a descrição
                                                    </button>
                                                )}

                                                {this.state.isLoading && (
                                                    <button class="btn_atualizar" type="submit" disabled>
                                                        Loading...
                                                    </button>
                                                )}

                                                {this.state.isLoading === false && this.state.Descricao !== '' && (
                                                    <button class="btn_atualizar" type="submit">Atualizar a descrição</button>
                                                )}
                                                {/* <button class="btn_atualizar" type="submit">Atualizar a descrição</button> */}
                                            </form>
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