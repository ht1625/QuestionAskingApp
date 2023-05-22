import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuestionBoxScreen from './questionBox';
import { useNavigation } from "@react-navigation/native";
import ChatScreen from './chat';
import ProfileScreen from './profile';
import HomepageScreen from './homepage';
import { Ionicons } from '@expo/vector-icons';
import {logout} from '../src/api/user_api';

export default TabScreen = () => {

    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();

    const renderLogoutButton = () => {
        const handleLogout = () => {
            // handle logout logic here
            logout();
            //console.log("deneme");
            navigation.navigate('Login');
        };

        return (
            <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
                <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>
        );
    };

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
                tabBarActiveTintColor: '#723CEC',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#E7E0F7' }, // Bottom navbar background color
                headerStyle: { backgroundColor: '#E7E0F7' }, // Top navbar background color
                headerRight: () => {
                    if (route.name === 'Profile') {
                        return renderLogoutButton();
                    }
                    return null;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomepageScreen} options={{
                headerShown: false,
            }} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="QuAsk" component={QuestionBoxScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}