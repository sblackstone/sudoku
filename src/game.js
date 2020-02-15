import React from 'react';
import Board from './board.mjs';
import './board.scss';
const Marks = function(props) {
    return(
      <table className="marksTable">
        <tbody>
          <tr>
            <td>{props.marks[1] ? "1" : ""}</td>
            <td>{props.marks[2] ? "2" : ""}</td>
            <td>{props.marks[3] ? "3" : ""}</td>
          </tr>
          <tr>
            <td>{props.marks[4] ? "4" : ""}</td>
            <td>{props.marks[5] ? "5" : ""}</td>
            <td>{props.marks[6] ? "6" : ""}</td>
          </tr>
          <tr>
            <td>{props.marks[7] ? "7" : ""}</td>
            <td>{props.marks[8] ? "8" : ""}</td>
            <td>{props.marks[9] ? "9" : ""}</td>
          </tr>
        </tbody>
      </table>
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
      ret.push(<GameCell key={`${i}${j}`} cell={props.board.rows[i][j]} row={i} col={j} />);
    }
  }
  return ret;
}

const GameCell = function(props) {
  return (
    <div className={`cell r${props.row} c${props.col}`}>
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

  render() {
    return (
      <div className="board">
        <GameCells board={this.state.board} />
      </div>

    )
  }


}


export default Game;
