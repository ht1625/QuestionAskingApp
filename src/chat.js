import React from "react";
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useEffect } from "react";
import ContactRow from './components/contactRow';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const chats = [
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: [],
    },
    {
        users: ["a@gmail.com", "b@gmail.com"],

        messages: [],
    },
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: [],
    }
]

const ChatScreen = (props) => {

    const navigation = useNavigation();

    useEffect(() => {

    }, []);

    return (
        <SafeAreaView>
            {chats.map((chat, index) => (
                <React.Fragment>
                    <React.Fragment key={index}>
                        <ContactRow
                            name="zeynep betul"
                            subtitle="deneme"
                            onPress={() => {
                                navigation.navigate('ChatDetail',"husniye@gmail.com","zeynep@gmail.com");
                            }}
                            icon={<Ionicons name="person-outline" size={24} color="red" />} // İkonun rengini kırmızı olarak ayarladık
                        />
                        <View style={styles.seperator} />
                    </React.Fragment>

                </React.Fragment>
            ))}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    seperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E2E2E2',
        marginStart: 16
    }
})
export default ChatScreen;