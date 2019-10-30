const initialState = {
  email: "",
  profile_pic: "",
  user_id: 0
};

const UPDATE_USER = "UPDATE_USER";

export function updateUser(email, profile_pic, user_id) {
  return {
    type: UPDATE_USER,
    payload: { email, profile_pic, user_id }
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case UPDATE_USER:
      return {
        ...state,
        email: payload.email,
        profile_pic: payload.profile_pic,
        user_id: payload.user_id
      };
    default:
      return state;
  }
}
