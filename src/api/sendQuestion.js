import ApiManager from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendQuestion = async data => {

    let token = await AsyncStorage.getItem('token');
   console.log('giden token: '+token)

   const formData = new FormData();
   formData.append('branch', data.branch);
   formData.append('question', data.question);
   //formData.append('comment', data.comment);
   //formData.append('class', data.class);

    try {
        const result = await ApiManager('/student/ask-question', {
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer '+ token,
          },
          data: formData,
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
   
};

