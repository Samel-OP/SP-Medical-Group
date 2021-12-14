import React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./src/screens/main";
import Login from "./src/screens/login";
import ConsultaPaciente from "./src/screens/consultasPaciente";

const AuthStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
      hidden={true}
      />
      <AuthStack.Navigator
        initialRouteName='ConsultaPaciente'
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="ConsultaPaciente" component={ConsultaPaciente}></AuthStack.Screen>
        <AuthStack.Screen name="Main" component={Main}></AuthStack.Screen>
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default App;