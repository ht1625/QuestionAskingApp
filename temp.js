import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dimensions, Text, View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { darkPurple, grayColor, lightBlue, redColor, whiteColor } from '../../theme';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { FILE_UPLOAD_URL } from '../../config';
import DocumentPicker from 'react-native-document-picker';
import { AxiosContext } from '../../context/AxiosContext';


const { width, height } = Dimensions.get("window");


let DocumentUpload = (props) => {

    const [imageData, setimageData] = useState();
    const [auxText, setauxText] = useState();
    const [sameFileError, setsameFileError] = useState(false);


    let selectFile = async () => {
        const res = await DocumentPicker.pickMultiple({
            type: [DocumentPicker.types.pdf],
        })
        console.log(res);
        setimageData(res[0])
        bs.current.snapTo(1);
    }

    const axiosContext = useContext(AxiosContext);

    const sendFile = async () => {
        let imgData = {
            name: imageData.name,
            type: imageData.type,
            uri: imageData.uri
        }
        let data = new FormData();
        data.append("file", imgData);
        data.append("name", "deneme53424");

        await axiosContext.authAxios.post(FILE_UPLOAD_URL,
            data).then((response) => {
                console.log(JSON.stringify("file uploaded-->", response.data));
                props.navigation.navigate("Welcome")
                setsameFileError(false)
            }).catch((error) => {
                console.log(error);
                switch (error.response.status) {
                    case 500:
                        return props.navigation.navigate("Login")
                    case 406:
                        return setsameFileError(true)
                    default:
                        break;
                }
            })

    };

    useEffect(() => {
        console.log("use effectin içi", axiosContext.refreshExpired);
        if (axiosContext.refreshExpired === true) {
            console.log("çıkarttık reaat ol");
            props.navigation.navigate("Login")
        } else {
            console.log("move on");
        }

    }, [axiosContext.refreshExpired]);

    // bottom camera menu

    let renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Belge Ekle</Text>
                <Text style={styles.panelSubtitle}>Lütfen eklemek istediğiniz belgeyi seçin</Text>
            </View>

            <TouchableOpacity style={styles.panelButton} onPress={selectFile}>
                <Text style={styles.panelButtonTitle}>Telefonundan Seç</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>İptal</Text>
            </TouchableOpacity>
        </View>
    );

    let renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const bs = React.useRef(null);
    let fall = new Animated.Value(1);

    return (
        <Fragment>
            <BottomSheet
                ref={bs}
                snapPoints={[280, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <Animated.ScrollView style={Platform.OS === "ios" ? { flex: 1, paddingHorizontal: 25, marginTop: 30, opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) } : { flex: 1, paddingHorizontal: 25, opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}>

                <Icon name="arrowleft" type="antdesign" color={darkPurple} size={31} containerStyle={{ width: 31, height: 31, marginTop: 25 }} onPress={() => props.navigation.navigate("SignUp")} />

                <View style={{}}>
                    <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
                    <Text style={{ fontFamily: "Nunito-Bold", fontSize: 18, marginBottom: height / 25 }}>Başarıyla kaydoldun!</Text>
                    <Text style={{ fontFamily: "Nunito-SemiBold", fontSize: 14, marginBottom: height / 15 }}>Şimdi hesabının eğitmen hesabı olarak aktive edilebilmesi için lütfen aşağıdaki bilgileri eksiksiz olarak doldur</Text>
                    <Text style={{ fontFamily: "Nunito-SemiBold", fontSize: 14, marginBottom: height / 15 }}>Lütfen doğrulamamız için mezuniyet belgenin bir kopyasını yükle</Text>

                    <View style={{ justifyContent: "center", alignSelf: "center", padding: 25, marginBottom: 35 }}>

                        <View>
                            {

                            }
                            <TouchableOpacity onPress={() => bs.current.snapTo(0)} style={{}}>
                                <Image resizeMode={"contain"} source={require("../../assets/images/pdf.png")} style={styles.questionImage} />
                                <Icon
                                    type={"font-awesome-5"}
                                    name={"times-circle"}
                                    iconStyle={{ color: darkPurple }}
                                    size={25}
                                    onPress={() => props.navigation.navigate("Home")}
                                    containerStyle={{ position: "absolute", bottom: 0, right: 15, top: 0 }}
                                />
                            </TouchableOpacity>
                        </View>



                        {/* <View style={{ flexDirection: "row", width: width - 50, }}>
                            <TouchableOpacity onPress={() => bs.current.snapTo(0)} style={{}}>
                                <Image resizeMode={imageData ? "cover" : "contain"} source={imageData ? require("../../assets/images/pdf.png") : require("../../assets/images/image.png")} style={styles.questionImage} />
                                <Icon
                                    reverse
                                    reverseColor={darkPurple}
                                    // name='camera'
                                    // type="simple-line-icon"
                                    type={"font-awesome-5"}
                                    name={"plus"}
                                    iconStyle={{ color: whiteColor }}
                                    size={13}
                                    color={darkPurple}
                                    backgroundColor={darkPurple}
                                    underlayColor={darkPurple}
                                    onPress={() => props.navigation.navigate("Home")}
                                    containerStyle={{ position: "absolute", bottom: 0, right: 15, top: 50 }}

                                />
                            </TouchableOpacity>
                            <Text numberOfLines={2} style={{
                                fontSize: 18, flex: 1,
                                fontFamily: "Nunito-SemiBold",
                                color: grayColor,
                                marginVertical: 15, alignSelf: "center",
                            }}>{imageData ? imageData.name + " başarıyla yüklendi" : "Lütfen belge yükleyiniz!"}</Text>

                        </View> */}
                        {
                            auxText
                                ?
                                <Text style={{ color: redColor, fontSize: 12, marginTop: 15 }}>Lütfen önce resim seçiniz</Text>
                                :
                                <View />

                        }
                        {
                            sameFileError
                                ?
                                <Text style={{ color: redColor, fontSize: 12, marginTop: 15 }}>Bu belgeyi zaten yüklediniz, lütfen başka bir belge seçiniz</Text>
                                :
                                <View />

                        }

                    </View>
                    <Button title="Kaydet" onPress={() => props.navigation.navigate("Pending")} containerStyle={{ backgroundColor: imageData ? darkPurple : "#BFBFBF", width: width * .6,  alignSelf: "center", }} />
                    <Button title="Kaydet" onPress={() => imageData ? sendFile() : setauxText(true)} containerStyle={{ backgroundColor: imageData ? darkPurple : "#BFBFBF", width: width * .6,  alignSelf: "center", }} />
                </View>
            </Animated.ScrollView>
        </Fragment>


    )
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: "center",
        width: 195.65,
        height: 74.39,
        marginBottom: 35
    },
    line: {
        backgroundColor: darkPurple,
        height: 1,
        width: width - 30,
        alignSelf: "center"
    },
    panel: {
        padding: 20,
        backgroundColor: whiteColor,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: darkPurple,
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    image: {
        flex: 1,
        alignItems: "center"
    },
    questionContainer: {
        height: 100,
        marginVertical: 10,
        width: width - 40,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 8,
        borderColor: darkPurple,
        borderWidth: 1,
        justifyContent: "space-between"
    },
    questionImage: {
        width: 80,
        height: 80,
        marginRight: 20
    },
    title: {
        fontSize: 18,
        fontFamily: "Nunito-SemiBold",
        color: grayColor,
        marginVertical: 15
    },
    questionContainer: {
        height: 100,
        marginVertical: 10,
        width: width - 40,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 8,
        borderColor: darkPurple,
        borderWidth: 1,
        justifyContent: "space-between"
    },
    questionImage: {
        width: 80,
        height: 80,
        marginRight: 20
    },
});



export default DocumentUpload;