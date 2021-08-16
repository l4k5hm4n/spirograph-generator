export const insert_template = (template) => {
  return {
    type: "INSERT_TEMPLATE",
    payload: template,
  };

  // return (dispatch, getState, { getFirebase, getFirestore }) => {
  //   // Make async call to database;
  //   const firestore = getFirestore();
  //   firestore
  //     .collection("users")
  //     .doc("neelp@zeta.tech")
  //     .update({
  //       myTemplates: [...myTemplates, template],
  //     })
  //     .then(() => {
  //       dispatch({ type: "INSERT_TEMPLATE", payload: template });
  //     })
  //     .catch((error) => {});
  // };

  // return {
  //   type: "INSERT_TEMPLATE",
  //   payload: template,
  // };
};
