import md5 from 'md5';

//common
export const HTTPS = 'https://';
export const HTTP = 'http://';
export const BASE_URL = 'gateway.marvel.com/v1/public/';

export const CHARACTERS = 'characters';
export const COMICS = 'comics';
export const SERIES = 'series';

// api key
export const PUBLIC_API_KEY = '77dad6bc00e881aa0f996e14cba18748';
const PRIVATE_API_KEY = '7542af24d02a0f3d027ff5c9e65d224fedb8bbca';

export const TS = Date.now();
export const HASH = md5(`${TS}${PRIVATE_API_KEY}${PUBLIC_API_KEY}`);
