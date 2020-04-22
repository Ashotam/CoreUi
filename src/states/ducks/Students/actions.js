import types from "./types";

const add = (data) => ({
  type: types.add,
  data,
});

const edit = (data) => ({
  type: types.edit,
  data,
});
const remuve = (id) => ({
  type: types.remuve,
  id,
});

export default {
  add,
  edit,
  remuve,
};
