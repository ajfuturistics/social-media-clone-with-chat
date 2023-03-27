import * as UserApi from "../../api/userRequests";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATE_USER_START" });

  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATE_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "UPDATE_USER_FAIL" });
  }
};
export const followUser = (id, userData) => async (dispatch) => {
  try {
    await UserApi.followUser(id, userData);
    dispatch({ type: "FOLLOW_USER", payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const unfollowUser = (id, userData) => async (dispatch) => {
  try {
    await UserApi.unfollowUser(id, userData);
    dispatch({ type: "UNFOLLOW_USER", payload: id });
  } catch (error) {
    console.log(error);
  }
};
