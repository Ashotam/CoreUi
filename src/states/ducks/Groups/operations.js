import actions from "./actions";



// This is a thunk which dispatches multiple actions from actions.js
const addGroup = ( faculty ) => ( dispatch ) => {
  
    dispatch( actions.add( faculty) );
}
const editGroup = ( faculty ) => ( dispatch ) => {
  
  dispatch( actions.edit( faculty) );
}
const deletGroup = ( id ) => ( dispatch ) => {
  
  dispatch( actions.remuve( id) );
}

export default {
  addGroup,
  editGroup,
  deletGroup,
};