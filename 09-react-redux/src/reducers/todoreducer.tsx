import { ToDoApplicationTypes } from "../ActionTypes";
import _ from "lodash";

const initialState = {
  items: [
    {
      id: 112,
      name: "Learning SAGA",
      status: "P"
    },
    {
      id: 111,
      name: "Implement React-REDUX",
      status: "C"
    },
    {
      id: 2121,
      name: "TestCases",
      status: "P"
    }
  ]
};

function todoReducer(
  state = initialState,
  action: {
    type: String;
    payload: any;
  }
) {
  switch (action.type) {
    case ToDoApplicationTypes.ADD_NEW_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case ToDoApplicationTypes.CHANGE_STATUS:
      const newstate = state.items.map((item: any) => {
        if (item.id == action.payload.id) {
          item.status = action.payload.status;
        }
      });

      return {
        ...state,
        newstate
      };

    case ToDoApplicationTypes.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item: any) => item.id != action.payload.id)
      };

    default:
      return state;
  }
}

export default todoReducer;
