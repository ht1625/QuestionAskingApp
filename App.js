import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routers from './src/routers';

const App = () => {
  return (
    <NavigationContainer>
      <Routers />
    </NavigationContainer>
  );
};
export default App;

/*import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./src/login";
import RegisterScreen from "./src/register";
import HomepageScreen from "./src/homepage";
import Splash from "./src/splash";


const stack = createNativeStackNavigator()
7*
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen name="Login" component={LoginScreen}/>
        <stack.Screen name="Splash" component={Splash} />
        <stack.Screen name="Register" component={RegisterScreen}/>
        <stack.Screen name="Homepage" component={HomepageScreen}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}*/