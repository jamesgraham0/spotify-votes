// This file is here in case I choose to add more reducers.
// Will need to change store.js to import rootReducer if others
// are added. It's being called in ../tracks/store

import { combineReducers } from 'redux';
import trackList from './reducer';

const rootReducer = combineReducers({
    trackList: trackList.reducer
});

export default rootReducer;