import axios from 'axios';
import { mediaServerUrl } from 'config';
import { baseUrl } from 'config';

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('image', file);

          axios.post(`${baseUrl}/images`, formData).then((res) => {
            console.log(res);
            resolve({
              default: mediaServerUrl + res.data.image,
            });
          });
        })
    );
  }
}

export default MyUploadAdapter;
