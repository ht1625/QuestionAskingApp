import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./src/login";
import RegisterScreen from "./src/register";

const stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen name="Login" component={LoginScreen}/>
        <stack.Screen name="Register" component={RegisterScreen}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}