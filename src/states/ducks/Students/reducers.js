import { combineReducers } from "redux";
import types from "./types";


const initialGroupState =
[
  {
    id:1,
    name:"Karen",
    lastName:"grigoryan",
    email:"karen@gmail.com",
    phone:"05528652",
    faculty:"Geography",
    group:"group1"
  },
  {
    id:2,
    name:"Armen",
    lastName:"Sargsyan",
    email:"karen@gmail.com",
    phone:"077283222",
    faculty:"History",
    group:"group7"
  },
  {
    id:3,
    name:"Gago",
    lastName:"Galstyan",
    email:"Gag@gmail.com",
    phone:"057899652",
    faculty:"Sociology",
    group:"group4"
  }
]

const StudentsReducer = ( state = initialGroupState, action ) => {
  switch( action.type ) {
      case types.add: 
      {
        let newState = [...state]
      newState.push(action.data)
      return newState
      }
      case types.edit:{
        let newState = [...state];
        newState.map((student)=>{
       if(student.id === action.data.id){
        student.name = action.data.name
        student.lastName=action.data.lastName
        student.phone=action.data.phone
        student.email=action.data.email
        student.faculty=action.data.faculty
        student.group=action.data.group
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
  data: StudentsReducer,
} );


export default reducer;