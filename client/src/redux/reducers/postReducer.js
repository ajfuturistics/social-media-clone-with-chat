const initialState = {
  posts: [],
  loading: false,
  error: false,
  uploading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POSTS_START":
      return { ...state, loading: true, error: false };
    case "GET_POSTS_SUCCESS":
      return { ...state, posts: action.payload, loading: false, error: false };
    case "GET_POSTS_FAIL":
      return { ...state, loading: false, error: true };
    case "UPLOAD_START":
      return { ...state, uploading: true, error: false };

    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        uploading: false,
      };

    case "UPLOAD_FAIL":
      return { ...state, error: true, uploading: false };

    default:
      return state;
  }
};

export default postReducer;
