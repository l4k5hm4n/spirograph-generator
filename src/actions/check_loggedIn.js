export const check_loggedIn = (userDetails) => {
  return {
    type: "CHECK_LOGGEDIN",
    payload: userDetails,
  };
};
