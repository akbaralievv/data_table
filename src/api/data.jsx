import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://64c3976a67cfdca3b65ff404.mockapi.io/films',
};

export const fetchData = async () => {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
