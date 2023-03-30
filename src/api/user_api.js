import ApiManager from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const user_login = async data => {
  try {
    const result = await ApiManager('/user/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
export const profile = async () => {
   let token = await AsyncStorage.getItem('token');
   console.log('giden token: '+token)

    try{

        const result = await ApiManager('/user/profile',{
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer '+ token,
            },
        });

        return result;
    }
    catch(error){
      return  error.response.data;
    }
};
export const logout = async () => {
    await AsyncStorage.removeItem("token");
    console.log("logged out");
  };

