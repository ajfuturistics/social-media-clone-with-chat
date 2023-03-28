import { API } from "./api";

export const userChats = (userId) => API.get(`/chat/${userId}`);
