import axios from 'axios';
import { BASE_URL, HASH, HTTPS, PUBLIC_API_KEY, TS } from 'constants/api';

const instance = axios.create({
  baseURL: HTTPS + BASE_URL,
  params: {
    ts: TS,
    apikey: PUBLIC_API_KEY,
    hash: HASH
  }
});

interface IResource {
  url: string;
  offset?: number;
}

export const getApiResource = async ({ url, offset }: IResource) => {
  try {
    const res = await instance.get(url, {
      params: {
        offset
      }
    });
    return res.data.data.results;
  } catch (error) {
    console.error(error);
    return false;
  }
};
