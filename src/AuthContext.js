import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {

  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  });


  const getToken = async () => {
    try {
    let token =  await AsyncStorage.getItem('token').then((e) => {
        setAuthState({
          token: e.token || null,
          authenticated: e.token !== null,
        });
      })

    } catch (error) {
      console.log("storage error", error);
      setAuthState({
        token: null,
        authenticated: false,
      });
    }
  }


  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setAuthState({
      token: null,
      authenticated: false,
    });
    console.log("çıktın bro");
  };




  const getAccessToken = () => {
    return authState.token;
  };
  useEffect(() => {
    getAccessToken();
  }, [])
  return (
    <AuthContext.Provider
      value={{
        authState,
        token,
        getAccessToken,
        setAuthState,
        logout,
        getToken
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };