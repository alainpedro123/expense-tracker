import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import expenses from '../reducers/expenses';
import filters from '../reducers/filters';

const logger = createLogger();
const rootReducer = combineReducers({ expenses, filters });

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));