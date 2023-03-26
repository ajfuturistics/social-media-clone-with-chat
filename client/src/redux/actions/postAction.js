import * as PostApi from "../../api/postRequests";

export const getTimelinePosts = (userId) => async (dispatch) => {
  dispatch({ type: "GET_POSTS_START" });

  try {
    const { data } = await PostApi.getTimelinePosts(userId);
    dispatch({ type: "GET_POSTS_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_POSTS_FAIL" });
  }
};
