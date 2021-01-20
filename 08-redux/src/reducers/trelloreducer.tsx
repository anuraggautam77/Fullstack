import { TrelloApplicationTypes } from "../actiontypes";

const initialState = {
  boards: [
    {
      id: 11,
      title: "Board One",
      lists: [
        {
          id: "11221",
          title: "TO DO"
        },
        {
          id: "111121",
          title: "INPROGRESS"
        },
        {
          id: "1121221",
          title: "DONE"
        }
      ],
      cards: [
        {
          id: "76869",
          title: "task1",
          detail: "Details of task1",
          listid: "11221"
        },
        {
          id: "qwewqewq",
          title: "task7",
          detail: "Details of task7",
          listid: "11221"
        },
        {
          id: "4324234",
          title: "task2",
          detail: "Details of task2",
          listid: "111121"
        },
        {
          id: "8768",
          title: "task3",
          detail: "Details of task3",
          listid: "1121221"
        }
      ]
    },
    {
      id: 22,
      title: "Board Two"
    }
  ]
};

function trelloReducer(
  state = initialState,
  action: { type: String; payload: any }
) {
  if (action.type === TrelloApplicationTypes.ADD_NEW_BOARD) {
    return Object.assign({}, state, {
      boards: state.boards.concat(action.payload)
    });
  }

  if (action.type === TrelloApplicationTypes.EDIT_BOARD) {
    const updatedstate = state.boards.map(board => {
      if (board.id == action.payload.id) {
        return { ...board, ...action.payload };
      }
      return board;
    });
    return { ...state, boards: updatedstate };
  }

  if (action.type === TrelloApplicationTypes.GET_BOARD_DETAIL) {
    return {
      ...state,
      board: state.boards.filter(board => {
        return board.id == action.payload.boardid;
      })
    };
  }

  if (action.type === TrelloApplicationTypes.ADD_LIST_IN_BOARD) {
    return {
      ...state,
      board: state.boards.filter((boarditem: any) => {
        if (boarditem.id == action.payload.boardid) {
          if (boarditem.hasOwnProperty("lists")) {
            boarditem.lists.push(action.payload.list);
          } else {
            boarditem.lists = [action.payload.list];
          }

          return boarditem;
        }
      })
    };
  }

  if (action.type === TrelloApplicationTypes.ADD_CARD_IN_LIST) {
    return {
      ...state,
      board: state.boards.filter((board: any) => {
        if (board.id == action.payload.boardid) {
          if (board.hasOwnProperty("cards")) {
            board.cards.push(action.payload.card);
          } else {
            board.cards = [action.payload.card];
          }
          return board;
        }
      })
    };
  }

  if (action.type === TrelloApplicationTypes.DELETE_CARD) {
    return {
      ...state,
      board: state.boards.filter((board: any) => {
        if (board.id == action.payload.boardid) {
          return (board.cards = board.cards.filter(
            (obj: any) => obj.id != action.payload.cardid
          ));
        }
      })
    };
  }

  if (action.type === TrelloApplicationTypes.DELETE_LIST) {
    return {
      ...state,
      board: state.boards.filter((board: any) => {
        if (board.id == action.payload.boardid) {
          return (board.lists = board.lists.filter(
            (obj: any) => obj.id != action.payload.listid
          ));
        }
      })
    };
  }
  return state;
}

export default trelloReducer;
