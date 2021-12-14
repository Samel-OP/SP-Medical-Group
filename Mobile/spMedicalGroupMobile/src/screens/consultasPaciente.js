import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

// import { FlatList } from "react-native-gesture-handler";

export default class ConsultaPaciente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: []
        };
    }

    buscarMinhasConsultas = async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbnJpcXVlQGdtYWlsLmNvbSIsImp0aSI6IjYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIzIiwicm9sZSI6IjMiLCJleHAiOjE2MzkyNTM3MjUsImlzcyI6InNwTWVkaWNhbEdyb3VwLndlYkFQSSIsImF1ZCI6InNwTWVkaWNhbEdyb3VwLndlYkFQSSJ9.5NdYa5BNdk3vwC5hHdH6SzCIVCT6Z8HXcukOLKHBDDI"
        const resposta = await api.get('/paciente/minhasConsultas', {
            headers: {
                Authorization: 'Bearer ' + token
            },
            // nomePaciente: this.state.nomePaciente,
            // dataConsulta: this.state.dataConsulta,
        });

        // const token = resposta.data.token;
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
            <View style={styles.containerLista}>
                <View style={styles.boxHeader}>
                    <Text style={styles.textHeader}>SP Medical Group</Text>
                </View>

                <View style={styles.containerTitulo}>
                    <View style={styles.boxTitulo}>
                        <Text style={styles.textTitulo}>Minhas consultas</Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.boxLista}>
                        <View style={styles.conteudoLista}>
                            <Text style={styles.nomePaciente}>Samuel Pereira</Text>
                            <Text style={styles.dataConsulta}>20/04/2004</Text>
                            <TouchableOpacity style={styles.btnVerDetalhes}><Text style={styles.btnText}>Ver detalhes</Text></TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
    containerTitulo: {
        alignItems: 'center',
        marginTop: 35
    },
    boxTitulo: {
        width: 350,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#006FAB',
        borderRadius: 30
    },
    textTitulo: {
        fontFamily: 'OpenSans-Regular',
        color: 'white',
        fontSize: 24
    },
    boxLista: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    conteudoLista: {
        width: 325,
        height: 75,
        backgroundColor: '#BDEBFE',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 50
    },
    nomePaciente: {
        fontFamily: 'OpenSans-Regular',
        color: 'black',
        fontSize: 12
    },
    dataConsulta: {
        fontFamily: 'OpenSans-Regular',
        color: 'black',
        fontSize: 12
    },
    btnVerDetalhes: {
        width: 105,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00A1F7',
        borderRadius: 5
    },
    btnText: {
        fontFamily: 'OpenSans-Bold',
        color: 'white',
        fontSize: 14
    },
});