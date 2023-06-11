import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { profile } from '../src/api/user_api';
import { useEffect, useState } from 'react';

const ProfileTableRow = ({ title, value }) => {
    return (
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={[styles.cell, styles.rightCell]}>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );
};

const ProfileScreen = () => {
    const [studentData, setStudentData] = useState({});

    useEffect(() => {
        console.log('data çekmeye hazırlanıyor...');
        profile().then(result => {
            console.log(result.data);
            setStudentData(result.data);
            console.log(studentData);
        }).catch(error => {
            console.log('Hata:', error);
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={require("../assets/images/student.png")} style={styles.profileImage} />
                {studentData && (
                    <>
                        <ProfileTableRow title="First Name" value={studentData.name} />
                        <ProfileTableRow title="Last Name" value={studentData.surname} />
                        <ProfileTableRow title="Nick Name" value={studentData.nickname} />
                        <ProfileTableRow title="Email" value={studentData.username} />
                        {studentData.questionCounts && (
                            <>
                                <ProfileTableRow title="Question Count" value={studentData.questionCounts.questionCount} />
                                <ProfileTableRow title="Solved Questions" value={studentData.questionCounts.solvedQuestions} />
                                <ProfileTableRow title="Not Solved Questions" value={studentData.questionCounts.notSolvedQuestions} />
                            </>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 50,
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
    },
    profile: {
        flex: 1,
        padding: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    cell: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightCell: {
        alignItems: 'flex-end',
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
    },
});

export default ProfileScreen;
