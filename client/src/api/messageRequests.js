import { API } from "./api";

export const getMessages = (chatId) => API.get(`/message/${chatId}`);

export const sendMessage = (message) => API.post(`/message/`, message);
