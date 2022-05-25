import { useCallback } from 'react';
import type { AxiosRequestConfig } from 'axios';
import { API_ENDPOINT } from '@env';
import { request } from "../constants/request"

export const useFileUpload = (config: AxiosRequestConfig = {}) => {
  const upload = useCallback(
    (file: any, customConfig: AxiosRequestConfig = {}) => {
      const formData = new FormData();
      formData.append('file', file);
      return request.post(API_ENDPOINT, formData);
    },
    [config],
  );
  return [upload];
};
