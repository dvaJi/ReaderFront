import axios from 'axios/index';
import * as config from '../config';

export function upload(data) {
  return dispatch => {
    return axios.post(config.READER_PATH + 'uploads', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };
}
