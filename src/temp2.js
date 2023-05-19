import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default QuestionBoxScreen = () => {

    const [selectedCourse, setSelectedCourse] = useState('');
    const [comment, setComment] = useState('');

    const courses = [
        { id: 1, name: 'Course 1' },
        { id: 2, name: 'Course 2' },
        { id: 3, name: 'Course 3' },
        { id: 4, name: 'Course 4' },
        { id: 5, name: 'Course 5' },
        { id: 6, name: 'Course 6' },
        { id: 7, name: 'Course 7' },
        { id: 8, name: 'Course 8' },
        { id: 9, name: 'Course 9' },
        { id: 10, name: 'Course 10' },
    ];

    const handleSendQuestion = () => {
        // function to handle sending question to server
        console.log('Question sent');
    };

    const handleCourseSelection = (course) => {
        setSelectedCourse(course);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Soru Sor</Text>
            <View>
                <Text>Resim yükle</Text>
            </View>
            <View style={styles.courseSelectionContainer}>
                <Text style={styles.subTitle}>Ders belirle</Text>
                <Text style={styles.courseSelectionText}>Aşağıdaki listeden sorunun dersini seç:</Text>
                <ScrollView horizontal={true} style={styles.courseButtonsContainer}>
                    {courses.map((course) => (
                        <TouchableOpacity
                            key={course.id}
                            onPress={() => handleCourseSelection(course.name)}
                            style={[
                                styles.courseButton,
                                { backgroundColor: course.name === selectedCourse ? '#2196F3' : '#E0E0E0' },
                            ]}>
                            <Text style={styles.courseButtonText}>{course.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.commentContainer}>
                <Text style={styles.subTitle}>Yorumun isteğe bağlı</Text>
                <TextInput
                    style={styles.commentInput}
                    multiline={true}
                    placeholder="Buraya yorum yazabilirsiniz..."
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                />
            </View>
            <TouchableOpacity onPress={() => handleSendQuestion()} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Soruyu Gönder</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inboxContainer: {
        height: 100,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    inboxText: {
        fontSize: 20,
        color: '#757575',
    },

});