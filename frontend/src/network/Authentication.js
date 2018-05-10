import axios from 'axios';
import Config from './Config';

const Authentication = {

  token: null,

  hasToken() {
    if (this.token !== null) {
      return true;
    }
    return false;
  },

  async login(email, password) {
    const self = this;
    return await axios.post(
      `${Config.baseUrl}${Config.baseVersion}sign_in`,
      { email, password }
    ).then((response) => {
      this.token = response.data.auth_token;
      return {
        status: response.status,
      };
    }).catch((error) => {
      const response = error.response;
      return {
        status: response.status,
        message: response.data.message,
      };
    });
  }
}

export default Authentication;
