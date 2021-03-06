import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import zonesReducer from './zones';
import ChoresReducer from './chores';
import UsersReducer from './user';
import CompletedChoresReducer from './completionStatus';
import SquadsReducer from './squads';
import OwnerSquadsReducer from './ownerSquads';
import UserSquadsReducer from './userSquads';

const rootReducer = combineReducers({
    session: sessionReducer,
    zones: zonesReducer,
    chores: ChoresReducer,
    users: UsersReducer,
    completionStatus: CompletedChoresReducer,
    squads: SquadsReducer,
    ownerSquads: OwnerSquadsReducer,
    userSquads: UserSquadsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;