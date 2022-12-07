import md5 from 'md5';

//common
export const HTTPS = 'https://';
export const HTTP = 'http://';
export const BASE_URL = 'gateway.marvel.com/v1/public/';

export const CHARACTERS = 'characters';
export const COMICS = 'comics';
export const SERIES = 'series';

// api key
export const PUBLIC_API_KEY = '0fc1b27f5fb9203e789251910bcb451c';
const PRIVATE_API_KEY = '82e7833f151f751a613f9f5321c9535a4b30529d';

export const TS = Date.now();
export const HASH = md5(`${TS}${PRIVATE_API_KEY}${PUBLIC_API_KEY}`);
