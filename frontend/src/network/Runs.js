import axios from 'axios';
import Config from './Config';

const Runs = {
  async get() {
    return await axios.get(
      `${Config.baseUrl}${Config.baseVersion}/runs`
    ).then((response) => {
      return {
        status: response.status,
        runs: response.data,
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

export default Runs
