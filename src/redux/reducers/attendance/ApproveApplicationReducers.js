//PhucNT34
import {
  WAITING_LIST_FOR_APPROVAL,
  WAITING_LIST_FOR_APPROVAL_SUCCESS,
  WAITING_LIST_FOR_APPROVAL_ERROR,
  GET_HISTORY_OF_APPROVAL_MENU_LISTS,
  GET_HISTORY_OF_APPROVAL_MENU_LISTS_SUCCESS,
  GET_HISTORY_OF_APPROVAL_MENU_LISTS_ERROR,
} from '../../actions/attendance';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  dataWaitingListForApproval: undefined,
  errorWaitingListForApproval: undefined,
  loadingWaitingListForApproval: false,

  dataHistoryOfApprovalMenuLists: undefined,
  errorHistoryOfApprovalMenuLists: undefined,
  loadingHistoryOfApprovalMenuLists: false,
};

const listForApprovalReducers = (state = initialState, action) => {
  // console.log('actionTypeEe: ', action.type);
  switch (action.type) {
    //waiting list for approval
    case WAITING_LIST_FOR_APPROVAL:
      // console.warn('WAITING_LIST_FOR_APPROVAL 3', action.input);
      return Object.assign({}, state, {
        loadingWaitingListForApproval: true,
        dataWaitingListForApproval: undefined,
        errorWaitingListForApproval: undefined,
      });

    case WAITING_LIST_FOR_APPROVAL_SUCCESS:
      // console.warn('WAITING_LIST_FOR_APPROVAL_SUCCESS 3', action.data);
      return Object.assign({}, state, {
        loadingWaitingListForApproval: false,
        dataWaitingListForApproval: action.data,
        errorWaitingListForApproval: undefined,
      });

    case WAITING_LIST_FOR_APPROVAL_ERROR:
      // console.warn('WAITING_LIST_FOR_APPROVAL_ERROR 3', action.error);
      return Object.assign({}, state, {
        loadingWaitingListForApproval: false,
        dataWaitingListForApproval: undefined,
        errorWaitingListForApproval: action.error,
      });

    // History of approval menu lists
    case GET_HISTORY_OF_APPROVAL_MENU_LISTS:
      // console.warn('GET_HISTORY_OF_APPROVAL_MENU_LISTS 3', action.input);
      return Object.assign({}, state, {
        loadingHistoryOfApprovalMenuLists: true,
        dataHistoryOfApprovalMenuLists: undefined,
        errorHistoryOfApprovalMenuLists: undefined,
      });

    case GET_HISTORY_OF_APPROVAL_MENU_LISTS_SUCCESS:
      // console.warn('GET_HISTORY_OF_APPROVAL_MENU_LISTS_SUCCESS 3', action.data);
      return Object.assign({}, state, {
        loadingHistoryOfApprovalMenuLists: false,
        dataHistoryOfApprovalMenuLists: action.data,
        errorHistoryOfApprovalMenuLists: undefined,
      });

    case GET_HISTORY_OF_APPROVAL_MENU_LISTS_ERROR:
      // console.warn('GET_HISTORY_OF_APPROVAL_MENU_LISTS_ERROR 3', action.error);
      return Object.assign({}, state, {
        loadingHistoryOfApprovalMenuLists: false,
        dataHistoryOfApprovalMenuLists: undefined,
        errorHistoryOfApprovalMenuLists: action.error,
      });
    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        dataWaitingListForApproval: undefined,
        errorWaitingListForApproval: undefined,
        loadingWaitingListForApproval: false,

        dataHistoryOfApprovalMenuLists: undefined,
        errorHistoryOfApprovalMenuLists: undefined,
        loadingHistoryOfApprovalMenuLists: false,   
      });
    default:
      return state;
  }
};

export default listForApprovalReducers;
