import axios from 'axios';
import Config from './Config';

const Authentication = {
  async login(email, password) {
    return await axios.post(
      `${Config.baseUrl}${Config.baseVersion}`,
      { email, password }
    ).then((response) => {
      console.log(response);
      debugger;
    }).catch((error) => {
      console.log(error);
      debugger;
    });
  }
}

export default Authentication;
