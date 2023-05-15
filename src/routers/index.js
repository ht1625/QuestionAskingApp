import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "../login";
import RegisterScreen from "../register";
import TabScreen from "../tab";
import Splash from "../splash";
import Welcome from "../welcome";
import ChatDetailScreen from "../chatDetail";
import HelpScreen from '../help';

const Stack = createNativeStackNavigator();

const Routers = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Tab" component={TabScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      <Stack.Screen name="Help" component={HelpScreen}/>
    </Stack.Navigator>
  );
};
export default Routers;