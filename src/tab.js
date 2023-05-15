import React from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuestionBoxScreen from './questionBox';
import ChatScreen from './chat';
import ProfileScreen from './profile';
import HomepageScreen from './homepage';
import { Ionicons } from '@expo/vector-icons';

export default TabScreen = () => {

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home-outline'
                            : 'ios-home-outline';
                    } else if (route.name === 'QuAsk') {
                        iconName = focused ? 'ios-cube-outline' : 'ios-cube-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'ios-person-outline' : 'ios-person-outline';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'ios-chatbubble-ellipses-outline' : 'ios-chatbubble-ellipses-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomepageScreen} options={{
                headerShown: false,
            }} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="QuAsk" component={QuestionBoxScreen} options={{
                headerShown: false,
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}