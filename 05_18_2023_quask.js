import React, { useState, useEffect } from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    TextInput, 
    StyleSheet,
    Button as RNPButton
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";

const CameraModule = (props) => {
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                props.setModalVisible();
            }}
        >
            <Camera
                style={{ flex: 1 }}
                ratio="16:9"
                flashMode={Camera.Constants.FlashMode.on}
                type={type}
                ref={(ref) => {
                    setCameraRef(ref);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        justifyContent: "flex-end",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "black",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            icon="close"
                            style={{ marginLeft: 12 }}
                            mode="outlined"
                            color="white"
                            onPress={() => {
                                props.setModalVisible();
                            }}
                        >
                            Close
                        </Button>
                        <TouchableOpacity
                            onPress={async () => {
                                if (cameraRef) {
                                    let photo = await cameraRef.takePictureAsync();
                                    console.log(typeof(photo));
                                    props.setImage(photo);
                                    props.setModalVisible();
                                }
                            }}
                        >
                            <View
                                style={{
                                    borderWidth: 2,
                                    borderRadius: 50,
                                    borderColor: "white",
                                    height: 80,
                                    width: 80,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginBottom: 16,
                                    marginTop: 8,
                                }}
                            >
                                <View
                                    style={{
                                        borderWidth: 2,
                                        borderRadius: 20,
                                        borderColor: "white",
                                        height: 60,
                                        width: 60,
                                        backgroundColor: "white",
                                    }}
                                ></View>
                            </View>
                        </TouchableOpacity>
                        <Button
                            icon="axis-z-rotate-clockwise"
                            style={{ marginRight: 12 }}
                            mode="outlined"
                            color="white"
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}
                        >
                            {type === Camera.Constants.Type.back ? "Front" : "Back "}
                        </Button>
                    </View>
                </View>
            </Camera>
        </Modal>
    );
};

export default QuestionBoxScreen = () => {

    const [image, setImage] = useState(null);
    const [camera, setShowCamera] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    //aşağısı kamera dışındakiler için
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [comment, setComment] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    //aşağısı kamera dışındaki alan için"

    const handleCourseSelection = (course) => {
        setSelectedCourse(course);
    };

    const handleSendQuestion = () => {
        // function to handle sending question to server
        console.log('Question sent');
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={styles.courseSelectionContainer}>
                <Text style={styles.subTitle}>Ders belirle</Text>
                <Text style={styles.courseSelectionText}>Aşağıdaki listeden sorunun dersini seç:</Text>
                <View style={styles.buttonContainer}>
                    <RNPButton mode="contained" color="#FF5722" labelStyle={{color: '#FFF'}} onPress={() => handleCourseSelection('Ders 1')} title="Ders 1"></RNPButton>
                    <RNPButton mode="contained" color="#FF5722" labelStyle={{color: '#FFF'}} onPress={() => handleCourseSelection('Ders 2')} title="Ders 2"></RNPButton>
                    <RNPButton mode="contained" color="#FF5722" labelStyle={{color: '#FFF'}} onPress={() => handleCourseSelection('Ders 3')} title="Ders 3"></RNPButton>
                    <RNPButton mode="contained" color="#FF5722" labelStyle={{color: '#FFF'}} onPress={() => handleCourseSelection('Ders 4')} title="Ders 4"></RNPButton>
                </View>
                <View style={styles.buttonContainer}>
                    <RNPButton mode="contained" color="#FF5722" labelStyle={{color: '#FFF'}} onPress={() => handleCourseSelection('Ders 5')} title="Ders 5"></RNPButton>
                    <RNPButton mode="contained" color="#FF5722" labelStyle={{color: '#FFF'}} onPress={() => handleCourseSelection('Ders 6')} title="Ders 6"></RNPButton>
                    <RNPButton mode="contained" color="#FF5722" labelStyle={{color: '#FFF'}} onPress={() => handleCourseSelection('Ders 7')} title="Ders 7"></RNPButton>
                </View>
            </View>              
            <View
                style={{
                    backgroundColor: "#eeee",
                    width: 120,
                    height: 120,
                    borderRadius: 100,
                    marginBottom: 2,
                    marginTop: 60
                }}
            >
                <Image
                    source={{ uri: image }}
                    style={{ width: 120, height: 120, borderRadius: 20 }}
                />
            </View>
            <Button
                style={{ width: "30%", marginTop: 12 }}
                icon="camera"
                mode="contained"
                onPress={() => {
                    setShowCamera(true);
                }}
            >
                Camera
            </Button>
            {camera && (
                <CameraModule
                    showModal={camera}
                    setModalVisible={() => setShowCamera(false)}
                    setImage={(result) => setImage(result.uri)}
                />
            )}     
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
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginTop: 0
    },
    navbar: {
        height: 60,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    navbarTitle: {
        color: '#FFF',
        fontSize: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 0,
    },
    courseSelectionContainer: {
      marginBottom: 20,
      padding: 0,
      marginTop: 0
    },
    subTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    courseSelectionText: {
      fontSize: 16,
      marginBottom: 8,
    },
    courseButtonsContainer: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    courseButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
      marginRight: 8,
    },
    courseButtonText: {
      color: 'white',
    },
    commentContainer: {
      marginBottom: 20,
    },
    commentInput: {
      height: 100,
      backgroundColor: '#E0E0E0',
      paddingHorizontal: 12,
      paddingTop: 8,
      marginBottom: 8,
    },
    sendButton: {
      backgroundColor: '#2196F3',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 4,
    },
    sendButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
});