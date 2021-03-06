import React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./src/screens/main";
import Login from "./src/screens/login";
import DescricaoPaciente from "./src/screens/descricaoPaciente";
import ConsultaPaciente from "./src/screens/consultasPaciente";
import ConsultaMedico from "./src/screens/consultasMedico";
import DescricaoMedico from "./src/screens/descricaoMedico";

const AuthStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        hidden={true}
      />
      <AuthStack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Main" component={Main}></AuthStack.Screen>
        <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
        <AuthStack.Screen name="ConsultaPaciente" component={ConsultaPaciente}></AuthStack.Screen>
        <AuthStack.Screen name="ConsultaMedico" component={ConsultaMedico}></AuthStack.Screen>
        <AuthStack.Screen name="DescricaoPaciente" component={DescricaoPaciente}></AuthStack.Screen>
        <AuthStack.Screen name="DescricaoMedico" component={DescricaoMedico}></AuthStack.Screen>
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default App;