// const initialState = 0;
const initialState = [];
const userDefinedTemplatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INSERT_TEMPLATE":
      // return state + 1;
      // console.log(state);
      var temp = { id: state.length, ...action.payload };
      console.log(temp);
      // state = [...state, temp];
      // state.push(temp);
      // console.log(state);
      return [...state, temp];

    // console.log(action.payload);
    case "REMOVE_TEMPLATE":
      // console.log(action);
      state = state.filter((template) => {
        return action.id !== template.id;
      });
      state.forEach((template, index) => {
        template.id = index;
      });
      return state;
    // return newTemplates;
    case "RESET_TEMPLATES":
    // return;
    default:
      return state;
  }
};
export default userDefinedTemplatesReducer;
