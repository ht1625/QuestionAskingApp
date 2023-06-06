import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {profile} from '../src/api/user_api';
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

    const [studentData, setStudentData] = useState(''); 

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
                <Image source={{ uri: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=' }} style={styles.profileImage} />
                <ProfileTableRow title="First Name" value='John' />
                <ProfileTableRow title="Last Name" value='Erick' />
                <ProfileTableRow title="Nick Name" value='MathPro' />
                <ProfileTableRow title="Phone Number" value='+90 555 555 5555' />
                <ProfileTableRow title="Email" value={studentData.username} />
                <ProfileTableRow title="Grade" value='HighSchool' />
                <ProfileTableRow title="Question Count" value='15' />
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
