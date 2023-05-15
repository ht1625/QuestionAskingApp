import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";

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
    const navigation = useNavigation();
    const route = useRoute();

    const studentData = {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '555-555-5555',
        email: 'johndoe@example.com',
        grade: '10th',
        questionCount: 12,
        imageUrl: 'https://media.licdn.com/dms/image/C4D03AQEYqZsobyzzYA/profile-displayphoto-shrink_800_800/0/1662841589971?e=1689206400&v=beta&t=-XidWGK7XCcpGZXleqsgjNh2bvs6EEKDrIIWYqb-C-Q',
    };

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{ uri: studentData.imageUrl }} style={styles.profileImage} />
                <ProfileTableRow title="First Name" value={studentData.firstName} />
                <ProfileTableRow title="Last Name" value={studentData.lastName} />
                <ProfileTableRow title="Phone Number" value={studentData.phoneNumber} />
                <ProfileTableRow title="Email" value={studentData.email} />
                <ProfileTableRow title="Grade" value={studentData.grade} />
                <ProfileTableRow title="Question Count" value={studentData.questionCount} />
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
        borderBottomWidth: 1,
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
        fontWeight: 'bold',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
    },
});

export default ProfileScreen;
