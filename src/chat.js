import React from "react";
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useEffect } from "react";
import ContactRow from './components/contactRow';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const chats = [
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: 'Okay',
        nameLecturer: 'Jessica',
    },
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: 'Thank you',
        nameLecturer: 'Monica'
    },
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: 'I dont get it',
        nameLecturer: 'Sue'
    },
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: 'No, I dont',
        nameLecturer: 'Barney'
    },
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: 'I dont have any question.',
        nameLecturer: 'Joe'
    }
]

const ChatScreen = (props) => {

    const navigation = useNavigation();

    useEffect(() => {

    }, []);

    return (
        <SafeAreaView>
            {chats.map((index) => (
                <React.Fragment>
                    <React.Fragment key={index}>
                        <ContactRow
                            name={index.nameLecturer}
                            subtitle={index.messages}
                            onPress={() => {
                                navigation.navigate('ChatDetail',{chatId: 'deneme'});
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