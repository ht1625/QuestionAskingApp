const React = require("react-native");

const { StyleSheet } = React;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Platform.OS === "android" ? '#d2601a' : "green",
      alignItems: 'center',
      flexWrap: "wrap"
    },
    containerView: {
        flex: 1,
        alignItems: "center"
    },
    loginScreenContainer: {
            flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 100,
        marginBottom: 30,
        textAlign: "center",
    },
    loginFormView: {
        flex: 1,
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#eaeaea",
        backgroundColor: "#fafafa",
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    loginButton: {
        backgroundColor: "#3897f1",
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginBottom: 20,
        width: 350,
        alignItems: "center"
    },
    fbLoginButton: {
        height: 45,
        marginTop: 20,
        backgroundColor: 'red',
    },
    image: {
        width: 250,
        height: 150,
        marginBottom: 20
    }
});
export default styles;