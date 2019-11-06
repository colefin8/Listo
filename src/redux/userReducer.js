import axios from "axios";

const initialState = {
  email: "",
  profile_pic: "",
  user_id: 1
};

const UPDATE_USER = "UPDATE_USER";

export function updateUser() {
  const data = axios
    .get("/api/auth/user")
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
  return {
    type: UPDATE_USER,
    payload: data
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER + "_FULFILLED":
      return payload
        ? {
            ...state,
            email: payload.email,
            profile_pic: payload.profile_pic,
            user_id: payload.user_id
          }
        : state;
    default:
      return state;
  }
}
