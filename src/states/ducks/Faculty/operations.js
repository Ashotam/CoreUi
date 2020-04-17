import actions from "./actions";



// This is a thunk which dispatches multiple actions from actions.js
const addFaculty = ( faculty ) => ( dispatch ) => {
  
    dispatch( actions.add( faculty) );
}
const editFaculty = ( faculty ) => ( dispatch ) => {
  
  dispatch( actions.edit( faculty) );
}
const deletFaculty = ( id ) => ( dispatch ) => {
  
  dispatch( actions.remuve( id) );
}

export default {
  addFaculty,
  editFaculty,
  deletFaculty,
};