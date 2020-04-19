import types from "./types";

const add = (data ) => ( {
    type: types.add,
    data
} );

const edit = ( data ) => ( {
    type: types.edit,
        data
    
} );
const remuve = ( id ) => ( {
  type: types.remuve,
      id
} );
const addGroup = (data,facultyName ) => ( {
  type: types.addGroup,
  data,
  facultyName
} );

const editGroup = ( data,facultyName ) => ( {
  type: types.editGroup,
      data,
      facultyName
} );
const remuveGroup = ( facultyName,id,) => ( {
type: types.remuveGroup,
    id,
    facultyName
} );

export default {
  add,
  edit,
  remuve,
  addGroup,
  editGroup,
  remuveGroup
};