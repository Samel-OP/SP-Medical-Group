import { React, Component } from 'react';
import axios from 'axios';

import Header from '../../components/header';
import Rodape from '../../components/rodape';

export default class cadastroConsulta extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nomeMedico: '',
            nomePaciente: '',
            situacao: 0,
            dataConsulta: new Date(),
            descricao: '',
            isLoading: false,

            listaConsultas: [],
            listaSituacao: [],
            listaPacientes: [],
        };
    }

    //Listar as consultas

    buscarConsultas = () => {
        axios('http://localhost:5000/api/consulta', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaConsultas: resposta.data });
                    console.log(this.state.listaConsultas);
                }
            })
            .catch((erro) => console.log(erro));
    };

    //Listar nome dos pacientes
    buscarPacientes = () => {
        axios('http://localhost:5000/api/paciente',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaPacientes: resposta.data });
                    console.log(resposta.data);
                    console.log(this.state.listaPacientes)
                }
            })
            .catch((erro) => console.log(erro));
    }

    //Cadastro

    cadastrarConsulta = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        let consulta = {
            nomeMedico: this.state.nomeMedico,
            nomePaciente: this.state.nomePaciente,
            situacao: parseInt(this.state.situacao),
            dataConsulta: new Date(this.state.dataConsulta),
            descricao: this.state.descricao,
        };

        axios.post('http://localhost:5000/api/consulta', consulta, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log('Consulta cadastrada!')
                    this.setState({ isLoading: false });
                }
            })
            .catch((erro) => {
                console.log(erro);
                this.setState({ isLoading: false });
            })
            .then(this.buscarConsultas);
    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    };

    componentDidMount() {
        this.buscarConsultas();
        this.buscarPacientes();
    }


    render() {
        return (
            <div>
                <Header />
                <main>
                    <section class="banner_cadastro">
                        <div class="container_form_cadastro">
                            <form onSubmit={this.cadastrarConsulta}>
                                <h1 class="titulo_cadastro">Cadastro de Consulta</h1>
                                <hr class="barra_cadastro" />

                                <label class="form_pergunta">Nome do médico</label>
                                <input class="input_dados" 
                                type="text" 
                                name="nomeMedico" 
                                value={this.state.nomeMedico}
                                placeholder="Escreva aqui" 
                                onChange={this.atualizaStateCampo}
                                required />

                                <label class="form_pergunta">Nome do paciente</label>
                                <input class="input_dados" 
                                type="text" 
                                name="nomePaciente" 
                                value={this.state.nomePaciente}
                                placeholder="Escreva aqui" 
                                onChange={this.atualizaStateCampo}
                                required />

                                <label class="form_pergunta">Situação</label>
                                <select 
                                class="input_dados" 
                                name="idSituacao"
                                onChange={this.atualizaStateCampo}
                                required>
                                    <option value="0" disabled selected>Selecione</option>
                                    <option value="3">Realizada</option>
                                    <option value="2">Cancelada</option>
                                    <option value="1">Aguardando</option>
                                </select>

                                <label class="form_pergunta">Data da consulta</label>
                                <input class="input_dados" 
                                type="datetime-local" 
                                name="dataConsulta"
                                value={this.state.dataConsulta} 
                                onChange={this.atualizaStateCampo}
                                required />

                                <label class="form_pergunta">Descrição</label>
                                <textarea class="input_dados_descricao" 
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.atualizaStateCampo}
                                placeholder="Escreva aqui"></textarea>

                                {this.state.isLoading && (
                                    <button type="submit" name="submit" class="btn_cadastrar" >Loading...</button>
                                )}

                                {this.state.isLoading === false && (
                                    <button type="submit" name="submit"  class="btn_cadastrar">Cadastrar</button>
                                )}
                            </form>
                        </div>
                    </section>
                    <section class="banner_listar_consulta">
                        <div class="box_titulo_lista">
                            <h2 class="titulo_lista_consulta">Lista de Consultas</h2>
                            <hr class="barra_lista_consulta" />
                        </div>
                        <div class="container_lista">
                            {this.state.listaConsultas.map((consulta) => {
                                  console.log("aki")

                            console.log(consulta)

                              return (
                                    <div class="box_lista">
                                        <table class="tabela_lista">
                                            <tr class="box_lista_conteudo" key={consulta.idConsulta}>
                                                <td class="numero_Consulta">{consulta.idConsulta}</td>
                                                {/* <td class="nome_paciente">{console.log(this.state.listaPacientes)}{console.log(consulta.idPaciente)}</td> */}
                                                <td class="nome_paciente">{consulta.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</td>
                                                <td class="data_consulta">{consulta.dataConsulta}</td>
                                                <td><button class="btn_lista_detalhes">Ver detalhes</button></td>
                                            </tr>

                                        </table>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </main>
                <Rodape />
            </div>
        )
    }
}