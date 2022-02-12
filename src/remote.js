import axios from "axios";

export const baseUrl = `https://en.wikipedia.org`

export const http = axios.create({
    baseURL: baseUrl,
});