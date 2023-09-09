import { createStore , combineReducers , applyMiddleware} from "redux";
import thunk from "redux-thunk";
import usersReducer from "../reducers/usersReducers";
import pgDetailsReducer from "../reducers/pgDetailsReducers";
import roomsReducer from "../reducers/roomsReducers";
import residentsReducer from "../reducers/residentsReducer";


const configureStore = () => {
    const store = createStore(
        combineReducers({
          users: usersReducer,
          pgDetails: pgDetailsReducer,
          rooms: roomsReducer,
          residents : residentsReducer 
        }),
        applyMiddleware(thunk)
      )
      return store
}

export default configureStore