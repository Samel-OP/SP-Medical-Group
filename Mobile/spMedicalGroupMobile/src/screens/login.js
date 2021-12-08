import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";
import { TextInput } from "react-native-gesture-handler";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
        };
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/img/fundoLogin.png')}
                style={StyleSheet.absoluteFillObject}
            >
                <View style={styles.containerLogin}>
                    <Image
                        style={styles.imgLogo}
                        source={require('../../assets/img/logo.png')}
                    />
                    <TextInput
                        style={styles.inputLogin}
                        placeholder="Email"
                        placeholderTextColor="black"
                        keyboardType="email-addresss"

                        onChangeText={email => this.setState({ email })}
                    />

                    <TextInput
                        style={styles.inputLogin}
                        placeholder="Senha"
                        placeholderTextColor="black"
                        keyboardType="default" //Para default não obrigatório
                        secureTextEntry={true} //Proteger a senha

                        onChangeText={senha => this.setState({ senha })}
                    />

                    <TouchableOpacity
                        style={styles.btnEntrar}
                    // onPress={this.}
                    ><Text style={styles.textEnviar}>Entrar</Text>
                    </TouchableOpacity>

                    <Text style={styles.textCopy}>© 2021 SP Medical Group</Text>
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    containerLogin: {
        alignItems: 'center'
    },
    imgLogo: {
        marginTop: 25,
        marginBottom: 20
    },
    inputLogin: {
        width: 300,
        height: 45,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 60,
        fontFamily: 'OpenSans-Regular',
        paddingLeft: 10,
        fontSize: 18
    },
    btnEntrar: {
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00A1F7',
        borderRadius: 5,
        marginTop: 30,
    },
    textEnviar: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20
    },
    textCopy: {
        color: 'white',
        marginTop: 120,
        fontSize: 14
    }
});