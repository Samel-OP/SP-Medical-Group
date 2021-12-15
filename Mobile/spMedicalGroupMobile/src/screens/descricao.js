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
            listaConsultas: []
        };
    }

    buscarMinhasConsultas = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await api.get('/paciente/minhasConsultas', {
            headers: {
                Authorization: 'Bearer ' + token
            },
            // nomePaciente: this.state.nomePaciente,
            // dataConsulta: this.state.dataConsulta,
        });

        await AsyncStorage.setItem('userToken', token);

        if (resposta.status == 200) {
            const dadosApi = resposta.data;
            this.setState({ listaConsultas: dadosApi });
            console.warn("Foi buscado!")
        }

        console.warn(resposta.data);
    };

    componentDidMount() {
        this.buscarMinhasConsultas();
    }

    render() {
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
                                <View style={styles.boxDadosConusulta}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.textConsulta}>Nome Paciente:</Text>
                            <View style={styles.boxConsulta}>
                                <View style={styles.boxDadosConusulta}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.textConsulta}>Nome Médico:</Text>
                            <View style={styles.boxConsulta}>
                                <View style={styles.boxDadosConusulta}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.textConsulta}>Data da Consulta:</Text>
                            <View style={styles.boxConsulta}>
                                <View style={styles.boxDadosConusulta}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.textConsulta}>Situação:</Text>
                            <View style={styles.boxConsulta}>
                                <View style={styles.boxDadosConusulta}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.textConsulta}>Descrição:</Text>
                            <View style={styles.boxConsulta}>
                                <View style={styles.boxDadosConusulta}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
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
        height: 575,
        backgroundColor: '#BDEBFE',
        borderRadius: 10,
        marginTop: 35
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
        fontSize: 14
    },
    boxDadosConusulta: {
        width: 300,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5
    },
})