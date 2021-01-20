export enum TrelloApplicationTypes {
  ADD_NEW_BOARD = "@@types/ADD_NEW_BOARD",
  EDIT_BOARD = "@@types/EDIT_BOARD",
  GET_BOARD_DETAIL = "@@types/GET_BOARD_DETAIL",
  ADD_LIST_IN_BOARD = "@@types/ADD_LIST_IN_BOARD",
  ADD_CARD_IN_LIST = "@@types/ADD_CARD_IN_LIST",
  DELETE_CARD = "@@types/DELETE_CARD",
  DELETE_LIST = "@@types/DELETE_LIST"
}

export enum SlackApplicationTypes {
  ADD_NEW_CHANNEL = "@@types/ADD_NEW_CHANNEL",
  GET_CHANNEL_MESSAGE = "@@types/GET_CHANNEL_MESSAGE",
  ADD_NEW_MESSAGE = "@@types/ADD_NEW_MESSAGE",
  GET_CURRENT_CHANNEL = "@@types/GET_CURRENT_CHANNEL",
  DELETE_MESSAGE = "@@types/DELETE_MESSAGE"
}

export enum ToDoApplicationTypes {
  ADD_NEW_ITEM = "@@types/ADD_NEW_ITEM",
  DELETE_ITEM = "@@types/DELETE_ITEM",
  CHANGE_STATUS = "@@types/CHANGE_STATUS"
}
