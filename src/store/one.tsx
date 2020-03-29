import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from 'redux-thunk'

const initialState = {
  calculator: {
    screen: "0",
    history: [],
    dec: false,
    changen: true
  },
  posts : {
    text: "",
    content: [],
    isLoading: false,
    error: null
  },
  info: ""
}

function reducer(state:any = initialState, action: any): object {
  switch (action.app) {
    case "CALCULATOR":
      switch (action.type) {
        case "HOLD":
          return {
            ...state,
            calculator: {
              ...state.calculator,
              screen: action.value,
              dec: action.dec,
              changen: action.changen
            }
          };
        case "EQUAL":
          if (state.calculator.history.length === 0 || state.calculator.history[state.calculator.history.length-1].calc !== action.history)
            state.calculator.history.push({calc: action.history});

          return {
            ...state,
            calculator: {
              ...state.calculator,
              dec: action.dec,
              changen: action.changen,
              screen: action.value,
              history: [...state.calculator.history]
            }
          };
        case "DEL":
          return {
            ...state,
            calculator: {
              ...state.calculator,
              history: state.calculator.history.filter((_:any, index:number) => {return index !== action.index})
            }
          };
        case "DEL-LAST":
          state.calculator.history.pop();
          return {
            ...state,
            calculator: {
              ...state.calculator,
              history: [...state.calculator.history]
            }
          };
        default:
          return state;
      }
    case "POSTS":
      switch (action.type) {
        case "TEXT":
          return {
            ...state,
            posts : {
              ...state.posts,
              text: action.text,
            }
          }
        case "GET_POSTS_BEGIN":
          return {
            ...state,
            posts : {
              ...state.posts,
              isLoading: true,
              error: null
            }
          }
        case "GET_POSTS_SUCCESS":
          return {
            ...state,
            posts : {
              ...state.posts,
              content: action.content,
              isLoading: false,
            }
          }
        case "GET_POSTS_ERROR":
          return {
            ...state,
            posts : {
              ...state.posts,
              error: action.error,
              isLoading: false,
            }
          }
        default:
          return state
      }
      case "INFO":
        switch (action.type) {
          case "READ":
            return {
              ...state,
              info : action.data
            }
          default:
            return state
        }
    default:
      return state
  }
  
}

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk),
  // other store enhancers if any
);

const store = createStore(reducer, enhancer);

export default store
