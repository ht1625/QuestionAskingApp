import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {

  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });


  const getToken = async () => {
    try {
      await AsyncStorage.getItem('token').then((e) => {
        setAuthState({
          jwtToken: e.jwtToken || null,
          refreshToken: e.refreshToken || null,
          authenticated: e.jwtToken !== null,
        });
      })

    } catch (error) {
      console.log("storage error", error);
      setAuthState({
        jwtToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }


  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setAuthState({
      jwtToken: null,
      refreshToken: null,
      authenticated: false,
    });
    console.log("çıktın bro");
  };




  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
        getToken
      }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };