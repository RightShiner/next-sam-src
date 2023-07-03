import http from 'helpers/http-common';
import { userService } from 'services';

const user = userService.userValue;

const upload = (file) => {
  let formData = new FormData();

  formData.append('file', file);

  return http.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user.token}`,
    },
  });
};

const getFiles = () => {
  // return http.get('/files');
};

export const uploadService = {
  upload,
  getFiles,
};
