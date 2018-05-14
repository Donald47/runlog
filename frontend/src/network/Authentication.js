import axios from 'axios';
import Config from './Config';

const Authentication = {

  async login(email, password) {
    const self = this;
    return await axios.post(
      `${Config.baseUrl}${Config.baseVersion}/sign_in`,
      { email, password }
    ).then((response) => {
      axios.defaults.headers.common['Authorization'] = response.data.auth_token;
      self.hasToken = true;
      return {
        status: response.status,
      };
    }).catch((error) => {
      const response = error.response;
      axios.defaults.headers.common['Authorization'] = null;
      self.hasToken = false;
      return {
        status: response.status,
        message: response.data.message,
      };
    });
  }
}

export default Authentication;
