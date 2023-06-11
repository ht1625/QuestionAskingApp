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

        const result = await ApiManager('/student/profile',{
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
export const getMessage = async (data) => {
  let token = await AsyncStorage.getItem('token');
  console.log('giden token: (Message) '+token)

  console.log(data);

  const formData = new FormData();
  formData.append('chat-id', data.chatId);
   try{

       const result = await ApiManager('/chat/messages',{
           method: 'GET',
           headers: {
            //'content-type': 'multipart/form-data',
            'Authorization': 'Bearer '+ token,
           },
           params: {
            'chat-id': data.chatId
           }
       });

       return result;
   }
   catch(error){
     return  error.response.data;
   }
};
export const register = async (data) => {
  console.log("deneme");
  try {
    const result = await ApiManager('/user/signup', {
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
export const closeChat = async (data) => {
  console.log("close chat");
  let token = await AsyncStorage.getItem('token');
  console.log('giden token: (Message) '+token)
  try {
    const result = await ApiManager('/student/comment', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer '+ token,
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
export const logout = async () => {
    await AsyncStorage.removeItem("token");
    console.log("logged out");
};
export const getStateOfQuestion = async () => {
  let token = await AsyncStorage.getItem('token');
  console.log('giden token: '+token)
   try{

       const result = await ApiManager('/student/questions',{
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
export const getChat = async () => {
  let token = await AsyncStorage.getItem('token');
  console.log('giden token: '+token)
   try{

       const result = await ApiManager('/chat/chats',{
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
