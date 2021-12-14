import React, { Component } from "react";

import {
    StyleSheet,
    View,
} from 'react-native';

import ConsultaPaciente from "./consultasPaciente";

// import { BottomNavigation } from 'react-native-paper';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const bottomTab = createBottomTabNavigator();

export default class Main extends Component {
    render() {
        return (
            <View style={styles.main}>
                <bottomTab.Navigator
                 initialRouteName='ConsultaPaciente'
                >
                    <bottomTab.Screen name="Minhas consultas" Component={ConsultaPaciente} ></bottomTab.Screen>
                </bottomTab.Navigator>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'blue'
    },
});