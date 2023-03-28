import { API } from "./api";

export const getMessages = (chatId) => API.get(`/message/${chatId}`);
