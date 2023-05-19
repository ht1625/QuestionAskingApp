import ApiManager from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendQuestion = async data => {

    let token = await AsyncStorage.getItem('token');
   console.log('giden token: '+token)

    try {
        const result = await ApiManager('/student/ask-question', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          //data: data,
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
   
};

