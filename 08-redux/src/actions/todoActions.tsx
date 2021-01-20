
import { ToDoApplicationTypes } from "../actiontypes";


export function addNewItem(payload: any) {
  return { type: ToDoApplicationTypes.ADD_NEW_ITEM, payload }
};


export function deleteItem(payload: any) {
  return { type: ToDoApplicationTypes.DELETE_ITEM, payload }
};

export function changestatus(payload: any) {
  return { type: ToDoApplicationTypes.CHANGE_STATUS, payload }
}