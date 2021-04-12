import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { delay } from "../../app/common/util/util";
import { toast } from "react-toastify";

const INCREMENT_ACTION = "INCREMENT_ACTION";
const DECREMENT_ACTION = "DECREMENT_ACTION";

export function increment(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({
        type: INCREMENT_ACTION,
        payload: amount,
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
      toast.error(error);
    }
  };
}
export function decrement(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({
        type: DECREMENT_ACTION,
        payload: amount,
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
      toast.error(error);
    }
  };
}

const initialState = {
  data: 42,
};

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_ACTION:
      return {
        ...state,
        data: state.data + action.payload,
      };
    case DECREMENT_ACTION:
      return {
        ...state,
        data: state.data - action.payload,
      };
    default:
      return state;
  }
}
