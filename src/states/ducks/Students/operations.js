import actions from "./actions";



// This is a thunk which dispatches multiple actions from actions.js
const addStudent = ( faculty ) => ( dispatch ) => {
  
    dispatch( actions.add( faculty) );
}
const editStudent = ( faculty ) => ( dispatch ) => {
  
  dispatch( actions.edit( faculty) );
}
const deletStudent = ( id ) => ( dispatch ) => {
  
  dispatch( actions.remuve( id) );
}

export default {
  addStudent,
  editStudent,
  deletStudent,
};