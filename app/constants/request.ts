import axios from 'axios';
import { merge } from "lodash"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const request = axios.create({
  // Timeout 30p
  timeout: 30 * 60 * 1000,
  withCredentials: true,
});

request.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return {
      ...config,
      headers: merge(config.headers, {
        authorization: token ? `Bearer ${token}` : '',
      }),
    };
  } catch {
    return config;
  }
});
