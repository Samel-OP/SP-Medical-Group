import { React, Component } from 'react';
import axios from 'axios';

import Header from '../../components/header';
import RodapeListar from '../../components/rodapeListar';

export default class consultaPaciente extends Component {
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
        axios('zz', {
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

    //Pegar Id
    PegarIdConsulta = (id) => {
        localStorage.setItem('usuario-consulta', id);
        console.log(id)
        this.props.history.push('/descricaoPaciente')
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
                    <section className="banner_listar_consulta_paciente">
                        <div className="box_titulo_lista">
                            <h2 className="titulo_lista_consulta">Minhas Consultas</h2>
                            <hr className="barra_lista_consulta_paciente" />
                        </div>
                        <div className="container_lista_paciente">
                            {this.state.listaMinhasConsultas.map((minhasConsultas) => {
                                return (
                                    <div className="box_lista">
                                        <table className="tabela_lista">
                                            <tr className="box_lista_conteudo" key={minhasConsultas.idConsulta}>
                                                <td className="numero_Consulta">{minhasConsultas.idConsulta}</td>
                                                <td className="nome_paciente">{minhasConsultas.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</td>
                                                <td className="data_consulta">{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: false
                                                }).format(new Date(minhasConsultas.dataConsulta))}</td>
                                                <td><button 
                                                className="btn_lista_detalhes"
                                                onClick={() => this.PegarIdConsulta(minhasConsultas.idConsulta)}                 
                                                >
                                                Ver detalhes
                                                </button></td>
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