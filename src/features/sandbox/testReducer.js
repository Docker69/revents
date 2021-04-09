const INCREMENT_ACTION = "INCREMENT_ACTION";
const DECREMENT_ACTION = "DECREMENT_ACTION";

export function increment(amount) {
  return {
    type: INCREMENT_ACTION,
    payload: amount,
  };
}

export function decrement(amount) {
  return {
    type: DECREMENT_ACTION,
    payload: amount,
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
