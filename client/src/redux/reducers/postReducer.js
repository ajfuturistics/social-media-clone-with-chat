const initialState = {
  posts: [],
  loading: false,
  error: false,
  uploading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_START":
      return {
        ...state,
        uploading: true,
        error: false,
      };

    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        uploading: false,
      };

    case "UPLOAD_FAIL":
      return {
        ...state,
        error: true,
        uploading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
