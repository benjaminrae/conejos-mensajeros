import axios from 'axios';

export class HttpClient {
  constructor() {}

  public async getFile(url: string) {
    return axios.get(url, {
      responseType: 'arraybuffer',
    });
  }
}
