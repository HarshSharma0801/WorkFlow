import apiClient from './apiClient';


export const getUserByEmail = async (email: string) => {
  const response = await apiClient.get(`/getUserByEmail` , {
    params:{
        email:email
    }
  });
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await apiClient.get(`/getUserById` , {
    params:{
        id:id
    }
  });
  return response.data;
};
