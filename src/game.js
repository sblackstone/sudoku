import React from 'react';
import Board from './board';
import './board.scss';
const Marks = function(props) {
    return(
      <table className="marksTable">
        <tr>
          <td>{props.marks[0] == 1 ? "1" : ""}</td>
          <td>{props.marks[1] == 1 ? "2" : ""}</td>
          <td>{props.marks[2] == 1 ? "3" : ""}</td>
        </tr>
        <tr>
          <td>{props.marks[3] == 1 ? "4" : ""}</td>
          <td>{props.marks[4] == 1 ? "5" : ""}</td>
          <td>{props.marks[5] == 1 ? "6" : ""}</td>
        </tr>
        <tr>
          <td>{props.marks[6] == 1 ? "7" : ""}</td>
          <td>{props.marks[7] == 1 ? "8" : ""}</td>
          <td>{props.marks[8] == 1 ? "9" : ""}</td>
        </tr>

      </table>
    )
}

const GameCell = function(props) {
  if (props.cell.value) {
    return props.cell.value;
  } else {
    return (
      <Marks marks={props.cell.marks} />
    )
  }
}

const GameRow = function(props) {
  let i = 0;
  return props.row.map((cell)=> {
    return (
      <td className={`cell col${(i++)}`}><GameCell cell={cell} /></td>
    )
  });
}

const GameRows = function(props) {
  let i = 0;
  return props.board.rows.map((row) => {
    return (
      <tr className={`row${i++}`}>
        <GameRow row={row} />
      </tr>
    )
  });
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
      <table className="board">
        <GameRows board={this.state.board} />
      </table>

    )
  }


}


export default Game;
