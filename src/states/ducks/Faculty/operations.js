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
const addGroup = ( data, facultyName) => ( dispatch ) => {
  
  dispatch(actions.addGroup( data,facultyName) );
}
const editGroup = ( data ) => ( dispatch ) => {
dispatch( actions.editGroup( data) );
}
const deletGroup = ( id,facultyName ) => ( dispatch ) => {

dispatch( actions.remuveGroup( id,facultyName) );
}

export default {
  addFaculty,
  editFaculty,
  deletFaculty,
  addGroup,
  editGroup,
  deletGroup
};