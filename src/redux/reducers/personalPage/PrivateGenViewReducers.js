//PhucNT34
import {
    GET_PRIVATE_GEN_VIEW, GET_PRIVATE_GEN_VIEW_SUCCESS, GET_PRIVATE_GEN_VIEW_ERROR,REMOVE_PRIVATE_GEN_VIEW
} from '../../actions/personalPage/PersonalPageAction'
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
  const initialState = {
    dataItem: null,
    error:null,
    loading:false,
  };
  
  const getPrivateGenViewReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRIVATE_GEN_VIEW:
            // console.warn('reducer 3', action.input);
            return {...state, loading:true}
        case GET_PRIVATE_GEN_VIEW_SUCCESS:
            // console.warn('reducer 7', action.dataItem);
            return {...state, dataItem: action.dataItem, loading:false}
        case GET_PRIVATE_GEN_VIEW_ERROR:
          // console.log('reducer 7', action.error);
            return {...state, error: action.error, loading:false}
        case REMOVE_PRIVATE_GEN_VIEW:
            return {...state, dataItem:null, error:null, loading:false}
            case POPUP_CALL_RESET_ALL_REDUCERS:
            return {...state}
        default: return state;
    }
  };
  
  export default getPrivateGenViewReducers;