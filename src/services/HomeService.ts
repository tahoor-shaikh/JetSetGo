import ApiService from './ApiService';

export const getFlightsList = async () => {
  const URL = ApiService.getApiUrl();
  const response = await ApiService.callGetApi(URL);
  return response;
};
