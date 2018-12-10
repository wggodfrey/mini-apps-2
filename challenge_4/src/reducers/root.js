import { combineReducers } from 'redux';

import settingsReducer from './settings.js';
import boardReducer from './board.js';
import minesReducer from './mines.js';
import flagsReducer from './flags.js';
import revealedReducer from './revealed.js';
import outcomeReducer from './outcome.js';

const rootReducer = combineReducers({
  settings: settingsReducer,
  board: boardReducer,
  mines: minesReducer,
  flags: flagsReducer,
  revealed: revealedReducer,
  outcome: outcomeReducer,
});

export default rootReducer;