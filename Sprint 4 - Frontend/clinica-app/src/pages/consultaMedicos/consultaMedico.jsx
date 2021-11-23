import { React, Component } from 'react';
import axios from 'axios';

import Header from '../../components/header';
import RodapeListar from '../../components/rodapeListar';

export default class consultaMedico extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idMedico: 0,
            idPaciente: 0,
            dataConsulta: new Date(),
            isLoading: false,

            listaMinhasConsultas: [],
            listaPacientes: [],
            listaMedicos: []
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
                <Header />
                <main>
                    <section class="banner_listar_consulta_paciente">
                        <div class="box_titulo_lista">
                            <h2 class="titulo_lista_consulta">Minhas Consultas</h2>
                            <hr class="barra_lista_consulta_paciente" />
                        </div>
                        <div class="container_lista_paciente">
                            {this.state.listaMinhasConsultas.map((minhasConsultas) => {
                                return (
                                    <div class="box_lista">
                                        <table class="tabela_lista">
                                            <tr class="box_lista_conteudo" key={minhasConsultas.idConsulta}>
                                                <td class="numero_Consulta">{minhasConsultas.idConsulta}</td>
                                                <td class="nome_paciente">{minhasConsultas.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</td>
                                                <td class="data_consulta">{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: false
                                                }).format(new Date(minhasConsultas.dataConsulta))}</td>
                                                <td><button class="btn_lista_detalhes">Ver detalhes</button></td>
                                            </tr>
                                        </table>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </main>
                <RodapeListar />
            </div>
        )
    }
}