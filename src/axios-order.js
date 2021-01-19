import axios from 'axios';

const instance = axios.create({
  baseURL : 'https://burger-builder-react-92bac-default-rtdb.firebaseio.com/'
});

export default instance;
