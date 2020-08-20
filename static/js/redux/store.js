import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import currentUser from './reducer'

const rootReducer = combineReducers({
    currentUser
})


let store = createStore(
    rootReducer, composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store
