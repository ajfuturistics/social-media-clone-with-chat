import { API } from "./api";

export const getTimelinePosts = (userId) => API.get(`/post/${userId}/timeline`);

export const likePost = (id, userId) =>
  API.put(`/post/${id}/like`, { userId: userId });
