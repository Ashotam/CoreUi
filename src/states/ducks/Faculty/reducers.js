import { combineReducers } from "redux";
import types from "./types";
import shortId from "shortid";

const initialFacultyState = [
  {
    id: shortId.generate(),
    name: "Geography",
    groups: [
      {
        id: shortId.generate(),
        name: "group1",
        facultyName: "Geography",
      },
      {
        id: shortId.generate(),
        name: "group2",
        facultyName: "Geography",
      },
      {
        id: shortId.generate(),
        name: "group3",
        facultyName: "Geography",
      },
    ],
  },
  {
    id: shortId.generate(),
    name: "Sociology",
    groups: [
      {
        id: shortId.generate(),
        name: "group4",
        facultyName: "Sociology",
      },
      {
        id: shortId.generate(),
        name: "group5",
        facultyName: "Sociology",
      },
      {
        id: shortId.generate(),
        name: "group6",
        facultyName: "Sociology",
      },
    ],
  },
  {
    id: shortId.generate(),
    name: "History",
    groups: [
      {
        id: shortId.generate(),
        name: "group7",
        facultyName: "History",
      },
      {
        id: shortId.generate(),
        name: "group8",
        facultyName: "History",
      },
      {
        id: shortId.generate(),
        name: "group9",
        facultyName: "History",
      },
    ],
  },
];

const facultyReducer = (state = initialFacultyState, action) => {
  switch (action.type) {
    case types.add: {
      let newState = [...state];
      newState.push(action.data);
      return newState;
    }
    case types.edit: {
      let newState = [...state];
      newState.map((fac) => {
        if (fac.id === action.data.id) {
          fac.name = action.data.name;
        }
      });
      return newState;
    }
    case types.remuve: {
      let newState = state.filter((fac) => {
        console.log(fac.id);
        return fac.id !== action.id;
      });
      return newState;
    }
    case types.addGroup: {
      let newState = [...state];
      newState.map((fac) => {
        if (fac.name === action.facultyName) {
          fac.groups.push(action.data);
        }
      });
      return newState;
    }
    case types.editGroup: {
      let newState = [...state];
      newState = newState.map((fac) => {
        if (fac.name == action.data.faculty) {
          console.log(fac.name, action.data, "gagul198");
          fac.groups.map((group) => {
            if (group.id === action.data.id) {
              group.name = action.data.name;
            }
            return group;
          });
        }
        return fac;
      });
      return newState;
    }
    case types.remuveGroup: {
      let newState = [...state];
      console.log(action.id);
      newState = newState.map((fac) => {
        if (fac.name === action.facultyName) {
          fac.groups = fac.groups.filter((group) => {
            console.log(group.id);
            return group.id !== action.id;
          });
        }
        return fac;
      });
      return newState;
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  data: facultyReducer,
});

export default reducer;
