import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const HelpScreen = (props) => {

    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    const [faqList, setFaqList] = useState([
        { question: 'How can I ask a question?', answer: 'To ask a question, go to the question screen and fill out the form.' },
        { question: 'Where can I view my questions?', answer: 'You can view your questions from your profile page.' },
        { question: 'What topics can teachers help me with?', answer: 'Our teachers are ready to help you with any topic.' },
        { question: 'How quickly will my question be answered?', answer: 'We strive to answer all questions within 24 hours.' },
        { question: 'Can I ask multiple questions?', answer: 'Yes, you can ask as many questions as you need help with.' },
    ]);

    const handleSearch = () => {
        // Implement search functionality here
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Help Page</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <TextInput
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={setSearchText}
                    style={{ flex: 1, marginRight: 10, padding: 10, backgroundColor: '#f2f2f2', borderRadius: 5 }}
                />
                <TouchableOpacity onPress={handleSearch} style={{ padding: 10, backgroundColor: '#4CAF50', borderRadius: 5 }}>
                    <Text style={{ color: 'white' }}>Search</Text>
                </TouchableOpacity>
            </View>
            {faqList.map((faq, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 }}>
                    <View style={{ width: 5, height: '100%', backgroundColor: '#ccc', marginRight: 10 }}></View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{faq.question}</Text>
                        <Text>{faq.answer}</Text>
                    </View>
                </View>
            ))}
            <TouchableOpacity onPress={() => props.navigation.navigate("Tab")} style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <Text style={{ fontSize: 16, color: 'blue' }}>Go to Homepage <AntDesign name="arrowleft" size={18} color="blue" /></Text>
            </TouchableOpacity>
        </View>
    );
};

export default HelpScreen;