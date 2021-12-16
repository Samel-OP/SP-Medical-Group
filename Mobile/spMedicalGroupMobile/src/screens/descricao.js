import React, { Component } from "react";

import {
    StyleSheet,
    View,
    Text,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

export default class Descricao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idConsulta: 0,
            Consulta: [],
            listaConsultas: []
        };
    }

    buscarMinhasConsultas = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await api.get('/paciente/minhasConsultas', {
            headers: {
                Authorization: 'Bearer ' + token
            },
        });

        if (resposta.status == 200) {
            let id = await AsyncStorage.getItem('userConsulta')
            // console.warn(id)
            if (resposta.status === 200) {

                resposta.data.map((consulta) => {

                    if (consulta.idConsulta == id) {
                        return (
                            this.setState({ Consulta: [consulta] })
                        );
                    }
                });
            }
        }

        // console.warn(resposta.data);
    };

    componentDidMount() {
        this.buscarMinhasConsultas();
    }

    render() {
        {
            return (
                this.state.Consulta.map((consulta) => {
                    return (
                        <View style={styles.containerConsulta}>
                            <View style={styles.boxHeader}>
                                <Text style={styles.textHeader}>SP Medical Group</Text>
                            </View>

                            <View style={styles.containerConteudo}>
                                <View style={styles.boxConteudo}>
                                    <View style={styles.boxTitulo}>
                                        <Text style={styles.textTitulo}>Consulta</Text>
                                        <View style={styles.barraTitulo} />
                                    </View>

                                    <View>
                                        <Text style={styles.textConsulta}>N° Consulta:</Text>
                                        <View style={styles.boxConsulta}>
                                            <View style={styles.boxDadosConsulta}>
                                                <Text style={styles.textDados}>{consulta.idConsulta}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.textConsulta}>Nome Paciente:</Text>
                                        <View style={styles.boxConsulta}>
                                            <View style={styles.boxDadosConsulta}>
                                                <Text style={styles.textDados}>{consulta.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.textConsulta}>Nome Médico:</Text>
                                        <View style={styles.boxConsulta}>
                                            <View style={styles.boxDadosConsulta}>
                                                <Text style={styles.textDados}>{consulta.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.textConsulta}>Data da Consulta:</Text>
                                        <View style={styles.boxConsulta}>
                                            <View style={styles.boxDadosConsulta}>
                                                <Text style={styles.textDados}>{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataConsulta))}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.textConsulta}>Situação:</Text>
                                        <View style={styles.boxConsulta}>
                                            <View style={styles.boxDadosConsulta}>
                                                <Text style={styles.textDados}>{consulta.idSituacaoNavigation.nomeSituacao}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.textConsulta}>Descrição:</Text>
                                        <View style={styles.boxConsulta}>
                                            <View style={styles.boxDadosConsultaDescricao}>
                                                <Text style={styles.textDados}>{consulta.descricao}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })
            );
        }
    }
}

const styles = StyleSheet.create({
    boxHeader: {
        width: 450,
        height: 40,
        backgroundColor: '#00A1F7',
        justifyContent: 'center',
        paddingLeft: 20
    },
    textHeader: {
        fontFamily: 'OpenSans-Regular',
        color: 'white',
        fontSize: 18
    },
    containerConteudo: {
        alignItems: 'center'
    },
    boxConteudo: {
        width: 350,
        height: 605,
        backgroundColor: '#BDEBFE',
        borderRadius: 10,
        marginTop: 25
    },
    boxTitulo: {
        alignItems: 'center',
        paddingTop: 20
    },
    textTitulo: {
        fontFamily: 'OpenSans-Bold',
        color: 'black',
        fontSize: 24
    },
    barraTitulo: {
        width: 110,
        height: 1,
        backgroundColor: 'black'
    },
    boxConsulta: {
        alignItems: 'center'
    },
    textConsulta: {
        fontFamily: 'OpenSans-Regular',
        color: 'black',
        fontSize: 14,
        marginLeft: 25,
        marginTop: 20
    },
    boxDadosConsulta: {
        width: 300,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        justifyContent: 'center'
    },
    textDados: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        color: 'black',
        marginLeft: 10
    },
    boxDadosConsultaDescricao: {
        width: 300,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        paddingTop: 8
    },
})