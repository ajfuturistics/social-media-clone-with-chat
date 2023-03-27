const initialState = {
  authData: null,
  loading: false,
  updateLoading: false,
  error: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        loading: false,
        authData: action.payload,
      };
    case "AUTH_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        loading: false,
        authData: null,
        error: false,
      };
    case "UPDATE_USER_START":
      return {
        ...state,
        updateLoading: true,
        error: false,
      };
    case "UPDATE_USER_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        updateLoading: false,
        authData: action.payload,
      };
    case "UPDATE_USER_FAIL":
      return {
        ...state,
        updateLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default authReducer;
