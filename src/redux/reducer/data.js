/* eslint-disable import/no-anonymous-default-export */
// const initialState = {
//   data: [],
// };
export default (state = [], action) => {
  if (action.type === "DATA_FETCH") {
    const data = [action.data];
    return data;
  }
  return state;
};
