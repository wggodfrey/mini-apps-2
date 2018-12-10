import { connect } from 'react-redux';

import Board from './../components/Board';
import { updateBoard } from './../actions/board';
import { adjustFlags } from './../actions/flags';
import { adjustMines } from './../actions/mines';
import { adjustRevealed } from './../actions/revealed';
import { adjustOutcome } from './../actions/outcome';

const mapStateToProps = state => ({
  size: state.settings.size,
  difficulty: state.settings.difficulty,
  board: state.board.slice(0), //TODO ... refactor this hack.
  flags: state.flags,
  mines: state.mines,
  revealed: state.revealed,
  outcome: state.outcome,
});

const mapDispatchToProps = dispatch => ({
  updateBoard: board => {
    dispatch(updateBoard(board));
  },
  adjustFlags: increment => {
    dispatch(adjustFlags(increment));
  },
  adjustMines: increment => {
    dispatch(adjustMines(increment));
  },
  adjustRevealed: increment => {
    dispatch(adjustRevealed(increment));
  },
  adjustOutcome: result => {
    dispatch(adjustOutcome(result));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);