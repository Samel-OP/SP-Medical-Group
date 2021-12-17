import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

import { FlatList } from "react-native-gesture-handler";

export default class ConsultaPaciente extends Component {
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
        });

        await AsyncStorage.setItem('userToken', token);

        if (resposta.status == 200) {
            const dadosApi = resposta.data;
            // console.warn(dadosApi)
            this.setState({ listaConsultas: dadosApi });
            console.warn("Foi buscado!")
        }

        // console.warn(resposta.data);
    };

    PegarIdConsulta = async (id) => {
        try {
            // console.warn(id)
            await AsyncStorage.setItem('userConsulta', JSON.stringify(id));
            // console.warn(id)
            this.props.navigation.navigate('DescricaoPaciente');
        } catch (error) {
            console.warn(error)
        }
    }

    // navegarDescricao = async () => {
    //     this.props.navigation.navigate('Descricao');
    // }

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

                <FlatList
                    data={this.state.listaConsultas}
                    keyExtractor={item => item.idConsulta}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }

    renderItem = ({ item }) => (
        <View style={styles.boxLista}>
            <View style={styles.conteudoLista}>
                <Text style={styles.nomePaciente}>{item.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</Text>
                <Text style={styles.dataConsulta}>{Intl.DateTimeFormat("pt-BR", {
                    year: 'numeric', month: 'short', day: 'numeric', hour12: true
                }).format(new Date(item.dataConsulta))}</Text>
                <TouchableOpacity
                    // onPress={this.navegarDescricao} 
                    onPress={() => this.PegarIdConsulta(item.idConsulta)} style={styles.btnVerDetalhes}
                ><Text style={styles.btnText}>Ver detalhes</Text></TouchableOpacity>
            </View>
        </View>
    )
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
        width: 375,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#006FAB',
        borderRadius: 30,
        marginBottom: 50
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
        width: 350,
        height: 75,
        backgroundColor: '#BDEBFE',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
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