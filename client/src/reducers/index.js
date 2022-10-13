// This file is here in case I choose to add more reducers

import { combineReducers } from 'redux';
import trackList from './trackList';

const rootReducer = combineReducers({
    trackList
});

export default rootReducer;