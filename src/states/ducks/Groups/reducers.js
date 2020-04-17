import { combineReducers } from "redux";
import types from "./types";


const initialGroupState =
[
  {
    id:1,
    name:"1ss",
    faculty:"Geography",
  },
  {
    id:2,
    name:"2cc",
    faculty:"Sociology"
  },
  {
    id:3,
    name:"3bb",
    faculty:"history"
  }
]

const GroupReducer = ( state = initialGroupState, action ) => {
  switch( action.type ) {
      case types.add: 
      {
        let newState = [...state]
      newState.push(action.data)
      return newState
      }
      case types.edit:{
        let newState = [...state];
        newState.map((group)=>{
       if( group.id === action.data.id){
        group.name = action.data.name
        group.faculty=action.data.faculty
         }
         })
         return newState
      } 
      case types.remuve:{
        let newState = state.filter((fac)=>{
          console.log(fac.id)
        return fac.id!==action.id
        }
        )
        return newState
      }
      default: return state;
  }
}


const reducer = combineReducers( {
  data: GroupReducer,
} );


export default reducer;