import React, { useState, useEffect } from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    Image,
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
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View
                style={{
                    backgroundColor: "#eeee",
                    width: 120,
                    height: 120,
                    borderRadius: 100,
                    marginBottom: 8,
                }}
            >
                <Image
                    source={{ uri: image }}
                    style={{ width: 120, height: 120, borderRadius: 20 }}
                />
            </View>
            <Button
                style={{ width: "30%", marginTop: 16 }}
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
        </View>
    );
}