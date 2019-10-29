const initialState = {
  email: "",
  profilePic: ""
};

const UPDATE_USER = "UPDATE_USER";

export function updateUser(email, profilePic) {
  return {
    type: UPDATE_USER,
    payload: { email, profilePic }
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
        profilePic: payload.profilePic
      };
    default:
      return state;
  }
}
