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
