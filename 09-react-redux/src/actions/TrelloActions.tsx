
import { TrelloApplicationTypes } from "../ActionTypes";


export function addNewBoard(payload: any) {
  return { type: TrelloApplicationTypes.ADD_NEW_BOARD, payload }
};


export function editBoard(payload: any) {
  return { type: TrelloApplicationTypes.EDIT_BOARD, payload }
};

export function getBoardDetail(payload: any) {
  return { type: TrelloApplicationTypes.GET_BOARD_DETAIL, payload }
}


export function addListInBoard(payload: any) {
  return { type: TrelloApplicationTypes.ADD_LIST_IN_BOARD, payload }
}

export function addCardInList(payload: any) {
  return { type: TrelloApplicationTypes.ADD_CARD_IN_LIST, payload }
}


export function deleteCard(payload: any) {
  return { type: TrelloApplicationTypes.DELETE_CARD, payload }
}

export function deleteList(payload: any) {
  return { type: TrelloApplicationTypes.DELETE_LIST, payload }
}
