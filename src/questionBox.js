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

    const [image, setImage] = useState('https://img.icons8.com/dusk/512w/camera--v1.png');
    const [imageText, setImageText] = useState(null);
    const [camera, setShowCamera] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    //aşağısı kamera dışındakiler için
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

    const handleSendQuestion = () => {
        // function to handle sending question to server
        // comment, imageText
        console.log("send Reply");       
    };  

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}> 
            <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                <Text style={styles.text1}>Class of Question</Text>
                </View>
                <View style={styles.tableCell}>
                <Text style={styles.text2}>Middle School</Text>
                </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                <Text style={styles.text1}>Lesson of Question</Text>
                </View>
                <View style={styles.tableCell}>
                <Text style={styles.text2}>Mathematic</Text>
                </View>
            </View>
            <Image
                source={require("../assets/questionGeo3.png")}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.subTitle}>Take of photo answer of question</Text>        
            <View style={{
                    backgroundColor: "#eeee",
                    width: 120,
                    height: 120,
                    borderRadius: 100,
                    marginBottom: 2,
                    marginTop: 2,
                }}>
                <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 20 }}/>
            </View>
            <Button
                style={{ width: "30%", marginTop: 5 }}
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
                <TextInput
                    style={styles.commentInput}
                    multiline={true}
                    placeholder="Write comment If you want"
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                />
            </View>   
            <TouchableOpacity onPress={() => handleSendQuestion()} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send Answer</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
    },
    tableCell: {
        flex: 1,
        alignItems: 'center',
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#9999CC',
        width: '85%',
        marginBottom: 8,
    },
    image: {
        width: 330,
        height:  200,
        marginBottom: 10, 
        marginTop: 8
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0,
        flex: 1
    },
    subTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 8,
      marginTop: 5,
      color: '#9999CC',
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
      marginBottom: 2,
      marginTop:15
    },
    sendButton: {
      backgroundColor: '#7F85EB',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 4,
    },
    sendButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    text: {
        color: "#000",
    },
});
    
    
    
    
    
    
    
  
  