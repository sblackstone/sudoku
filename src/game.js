import React from 'react';
import Board from './board.mjs';
import Controls from './controls.mjs';
import './scss/board.scss';
import './scss/game.scss';

const Marks = function(props) {
    return(
      <div className="marks">
        <div className="mark">{props.marks[1] ? "1" : ""}</div>
        <div className="mark">{props.marks[2] ? "2" : ""}</div>
        <div className="mark">{props.marks[3] ? "3" : ""}</div>

        <div className="mark">{props.marks[4] ? "4" : ""}</div>
        <div className="mark">{props.marks[5] ? "5" : ""}</div>
        <div className="mark">{props.marks[6] ? "6" : ""}</div>

        <div className="mark">{props.marks[7] ? "7" : ""}</div>
        <div className="mark">{props.marks[8] ? "8" : ""}</div>
        <div className="mark">{props.marks[9] ? "9" : ""}</div>
      </div>
    )
}

const GameCellValue = function(props) {
  if (props.cell.value !== -1) {
    return (<span className="cell-value">{props.cell.value}</span>);
  } else {
    return (
      <Marks marks={props.cell.marks} />
    )
  }
}

const GameCells = function(props) {
  const ret = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      ret.push(<GameCell onSquareClick={()=> { props.onSquareClick(i,j); }} key={`${i}${j}`} cell={props.board[i][j]} />);
    }
  }
  return ret;
}

const GameCell = function(props) {
  return (
    <div onClick={props.onSquareClick} className={`cell r${props.row} c${props.col}`}>
      <GameCellValue {...props} />
    </div>
  )
}


class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: new Board()
    }

  }

  onSquareClick(i,j) {
    console.log(i,j);
  }

  render() {
    return (
      <div className="game">
        <div className="board">
          <GameCells onSquareClick={this.onSquareClick.bind(this)} board={this.state.board.export()} />
        </div>
        <div className="controls">
          <Controls />
        </div>
      </div>
    )
  }


}


export default Game;
