export const remove_template = (templateID) => {
  return {
    type: "REMOVE_TEMPLATE",
    payload: templateID,
  };
};
