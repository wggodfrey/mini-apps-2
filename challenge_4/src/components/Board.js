import React from 'react';

import Cell from './Cell';

import './Board.css';

class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initBoard(this.props.size, this.props.difficulty);
  }

  componentDidUpdate() {
    if (this.props.outcome === 'reset') {
      this.props.adjustOutcome('pending');
      this.initBoard(this.props.size, this.props.difficulty);
    }
  }

  initBoard(n, m) {
    const matrix = new Array(n).fill(new Array(n).fill(0));
    const board = matrix.map(row => row.map(cell => ({status:'hidden', mine: false, nearby: 0})));
    let   mines = Math.round(n*n/100 * m);
    while (mines > 0) {
      let rIndex = Math.floor(Math.random()*n);
      let cIndex = Math.floor(Math.random()*n);
      if (!board[rIndex][cIndex].mine) {
        board[rIndex][cIndex].mine = true;
        mines -= 1;
      }
    }
    board.forEach((row, r) => row.map((cell, c) => {
      this.traverseSurroundingCells(board, r, c, (board, r, c, i, j) => {
        let targCell = board[r][c];
        let testCell = board[r + i][c + j];
        if (testCell.mine) targCell.nearby += 1;
      });
    }));
    this.props.updateBoard(board);

  }

  traverseSurroundingCells(board, r, c, cb) {
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (!(i == 0 && j == 0) && board[r + i] && board[r + i][c + j]) {
          cb(board, r, c, i, j);
        }
      }
    }
  }

  toggleCell(r, c) {
    let cell = this.props.board[r][c];
    if (cell.status !== 'inert') {
      if (cell.mine) {
        cell.status = 'mine';
        this.props.updateBoard(this.props.board);
        this.props.adjustOutcome('gameover');
      }
      else if (cell.nearby > 0) {
        cell.status = 'revealed';
        this.props.updateBoard(this.props.board);
      }
      else {
        cell.status = 'inert';
        this.traverseSurroundingCells(this.props.board, r, c, (board, r, c, i, j) => {
          if (board[r + i][c + j].nearby === 0) {
            this.toggleCell(r + i, c + j);
          } else {
            this.toggleCell(r + i, c + j);
          }
        });
      }
    }
  }

  toggleFlag(r, c) {
    let cell = this.props.board[r][c];
    if (cell.status === 'flag') {
      cell.status = 'hidden';
      this.props.adjustFlags(-1);
      if (this.mine) {
        this.props.adjustMines(1);
      }
    } else {
      cell.status = 'flag';
      this.props.adjustFlags(1);
      if (this.mine) {
        this.props.adjustMines(-1);
      }
    }
    this.props.updateBoard(this.props.board);
  }

  render() {
    return (
      <div className='Board'>
      {
        this.props.board
        ? <div className={`table ${this.props.outcome}`}>
            {
              this.props.board.map((row, r) => 
                <div className='row' key={`row${r}`}>
                {
                  row.map((cell, c) =>
                    <Cell 
                      key={`cell${c}`}
                      rIndex={r}
                      cIndex={c}
                      status={cell.status}
                      bomb={cell.mine}
                      nearby={cell.nearby}
                      toggleCell={this.toggleCell.bind(this)}
                      toggleFlag={this.toggleFlag.bind(this)}
                    />
                  )
                }
                </div>
              )
            }
          </div>
        : <div />
      }
      </div>
    );
  }
};

export default Board;