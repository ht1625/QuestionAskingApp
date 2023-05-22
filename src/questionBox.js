import React, { useState, useEffect } from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput, 
    StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";
import {sendQuestion} from '../src/api/sendQuestion';
import * as ImageManipulator from 'expo-image-manipulator';

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
                                    let photo = await cameraRef.takePictureAsync({ base64: true });
                                    // resim sıkıştırma
                                    const resizedPhoto = await ImageManipulator.manipulateAsync(
                                        photo.uri,
                                        [{ resize: { width: photo.width * 0.5, height: photo.height * 0.5 }}],
                                        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
                                    );
                                    // finish
                                    props.setImage(photo);
                                    props.setImageText(resizedPhoto);
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
    const [imageText, setImageText] = useState(null);
    const [camera, setShowCamera] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    //aşağısı kamera dışındakiler için
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedClassDegree, setSelectedClassDegree] = useState(null);
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

    // aşağısı kamera dışındaki alan için

    const handleCourseSelection = (course) => {
        setSelectedCourse(course);
    };

    const handleClassSelection = (course) => {
        setSelectedClassDegree(course);
    };

    const handleSendQuestion = () => {
        // function to handle sending question to server
        // comment, imageText, selectedCourse
        console.log(imageText);
        sendQuestion({
            //comment: comment,
            question: image,
            branch: selectedCourse,
            //class: 11
        })
        .then(result => {
            if (result.status == 201) {
              console.log('Question sent');
            }
        })
        .catch(err => {
            console.error(err);
        });        
    };  

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}> 
            <Text style={styles.subTitle}>Define class of question</Text>
            <View style={styles.container}>
                {["Primary School", "Middle School", "High School"].map((classDegree, index) => (
                    <View style={styles.buttonContainer} key={index}>
                    <TouchableOpacity 
                        style={selectedClassDegree === classDegree ? styles.selectedCourse : styles.course}
                        onPress={() => handleClassSelection(classDegree)}
                    >
                        <Text style={styles.text}>{classDegree}</Text>
                    </TouchableOpacity>
                    </View>
                ))}
            </View>       
            <Text style={styles.subTitle}>Define lesson of question</Text>
            <View style={styles.container}>
                {["BIOLOGY", "PHYSICS", "TURKISH", "CHEMISTRY", "MATH", "ENGLISH"].map((course, index) => (
                    <View style={styles.buttonContainer} key={index}>
                    <TouchableOpacity 
                        style={selectedCourse === course ? styles.selectedCourse : styles.course}
                        onPress={() => handleCourseSelection(course)}
                    >
                        <Text style={styles.text}>{course}</Text>
                    </TouchableOpacity>
                    </View>
                ))}
            </View>   
            <Text style={styles.subTitle}>Take of photo for question</Text>        
            <View style={{
                    backgroundColor: "#eeee",
                    width: 120,
                    height: 120,
                    borderRadius: 100,
                    marginBottom: 2,
                    marginTop: 10,
                }}>
                <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 20 }}/>
            </View>
            <Button
                style={{ width: "30%", marginTop: 12 }}
                icon="camera"
                mode="contained"
                onPress={() => {
                    setShowCamera(true);
                }}> Camera </Button>
            {camera && (
                <CameraModule
                    showModal={camera}
                    setModalVisible={() => setShowCamera(false)}
                    setImage={(result) => setImage(result.uri)}
                    setImageText={(result) => setImageText(result.base64)}
                />
            )}     
            <View style={styles.commentContainer}>
                <Text style={styles.subTitle}>Write comment If you want</Text>
                <TextInput
                    style={styles.commentInput}
                    multiline={true}
                    placeholder="Buraya yorum yazabilirsiniz..."
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                />
            </View>   
            <TouchableOpacity onPress={() => handleSendQuestion()} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send Question</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0
    },
    subTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      marginTop: 5
    },
    courseSelectionText: {
      fontSize: 16,
      marginBottom: 8,
    },
    commentContainer: {
      marginBottom: 20,   
      justifyContent: "center",
      alignItems: "center",
    },
    commentInput: {
      height: 100,
      backgroundColor: '#E0E0E0',
      paddingHorizontal: 70,
      paddingTop: 8,
      marginBottom: 8,
    },
    sendButton: {
      backgroundColor: '#7D9B88',
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
        width: '30%',
        height: 50,
        padding: 5,
    },
    course: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCourse: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7389B9',
        color: '#FFFFFF'
    },
    text: {
        color: "#000",
    },
});
    
    
    
    
    
    
    
  
  