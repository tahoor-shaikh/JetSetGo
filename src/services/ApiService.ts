import axios from 'axios';

class ApiService {
  getApiUrl() {
    return 'https://api.npoint.io/378e02e8e732bb1ac55b';
  }

  async callGetApi(url: string, headers: any = {}) {
    try {
      headers = {
        'Content-Type': 'application/json',
        ...headers,
      };

      const response = await axios.get(url, {headers: headers});
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);

        // Return or handle the server's response as needed
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received for the request');
        return {message: 'No response received for the request'};
      } else {
        // Something else happened in setting up the request
        console.log('Error setting up the request:', error.message);
        return {message: error.message};
      }
    }
  }
}

export default new ApiService();
