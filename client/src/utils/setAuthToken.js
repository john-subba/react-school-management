import axios from 'axios';

// this file is just used to add the global token header if there is token in the local storage if there is no token then it will delete the header from the token
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
