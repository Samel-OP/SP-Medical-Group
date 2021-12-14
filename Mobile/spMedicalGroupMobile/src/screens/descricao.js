import React, {Component} from "react";

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
            <View style={styles.containerLista}>
                <Text>Coé</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

})