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

            listaConsultas: [],
            listaData: [],
            listaNome: [],
            listaIdConsulta: [],
        };
    }

    //Listar os eventos

    buscarTiposEventos = () => {
        axios('http://localhost:5000/api/consulta' , {
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
        .then(this.buscarTiposEventos);
    };

    atualizaStateCampo = (campo) => {
        
    }


    render() {
        return (
            <div>
                <Header />
                <main>
                    <section class="banner_cadastro">
                        <div class="container_form_cadastro">
                            <form action="" method="post">
                                <h1 class="titulo_cadastro">Cadastro de Consulta</h1>
                                <hr class="barra_cadastro" />

                                <label class="form_pergunta">Nome do médico</label>
                                <input class="input_dados" type="text" name="nomeMedico" placeholder="Escreva aqui" required />

                                <label class="form_pergunta">Nome do paciente</label>
                                <input class="input_dados" type="text" name="nomePaciente" placeholder="Escreva aqui" required />

                                <label class="form_pergunta">Situação</label>
                                <select class="input_dados" required>
                                    <option value="Selecione" disabled selected>Selecione</option>
                                    <option value="Realizada">Realizada</option>
                                    <option value="Cancelada">Cancelada</option>
                                    <option value="Aguardando">Aguardando</option>
                                </select>

                                <label class="form_pergunta">Data da consulta</label>
                                <input class="input_dados" type="datetime-local" name="dataConsulta" required />

                                <label class="form_pergunta">Descrição</label>
                                <textarea class="input_dados_descricao" placeholder="Escreva aqui"></textarea>

                                <button type="submit" name="submit" class="btn_cadastrar">Cadastrar</button>
                            </form>
                        </div>
                    </section>
                    <section class="banner_listar_consulta">
                        <div class="box_titulo_lista">
                            <h2 class="titulo_lista_consulta">Lista de Consultas</h2>
                            <hr class="barra_lista_consulta" />
                        </div>
                        <div class="container_lista">
                            <div class="box_lista">
                                <table class="tabela_lista">
                                    <div class="box_lista_conteudo">
                                        <td class="numero_Consulta">N° Consulta</td>
                                        <td class="nome_paciente">Samuel Pereira</td>
                                        <td class="data_consulta">20/04/2021 - 15:00</td>
                                        <td><button class="btn_lista_detalhes">Ver detalhes</button></td>
                                    </div>
                                </table>
                            </div>
                        </div>
                    </section>
                </main>
                <Rodape />
            </div>
        )
    }
}