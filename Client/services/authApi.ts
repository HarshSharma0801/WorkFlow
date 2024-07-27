import apiClient from './apiClient';

interface User {
  name: string;
  email: string;
  password: string;
}

export const register = async (user: User) => {
  const response = await apiClient.post('/register', user);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

