import axios from 'axios';

export const request = axios.create({
  baseURL: process.env.NEXT_WEBAPP_HOST,
  ...(process.env.NEXT_WEBAPP_AUTH_KEY && {
    headers: { 'api-key': process.env.NEXT_WEBAPP_AUTH_KEY },
  }),
});
