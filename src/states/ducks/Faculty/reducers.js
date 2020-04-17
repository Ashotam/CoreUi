import { combineReducers } from "redux";
import types from "./types";

const initialFacultyState = [
  
    {
      id:1,
      name:"Geography",
      group:[]
    },
    {
      id:2,
      name:"Sociology",
      group:[]

    },
    {
      id:3,
      name:"history",
      group:[]
    }
  
];
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

const facultyReducer = ( state = initialFacultyState, action ) => {
  switch( action.type ) {
      case types.add: 
      {
        let newState = [...state]
      newState.push(action.data)
      return newState
      }
      case types.edit:{
        let newState = [...state];
        newState.map((fac)=>{
       if( fac.id === action.data.id){
       fac.name = action.data.name
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
  data: facultyReducer,
} );


export default reducer;