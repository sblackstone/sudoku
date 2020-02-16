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
      const isSelected = props.selectedSquare[0] === i && props.selectedSquare[1] === j;
      ret.push(<GameCell onSquareClick={()=> { props.onSquareClick(i,j); }} isSelected={isSelected} key={`${i}${j}`} cell={props.board[i][j]} i={i} j={j}/>);
    }
  }
  return ret;
}

const GameCell = function(props) {
  let selectedClass = "";
  if (props.isSelected) {
    selectedClass="selectedSquare";
  }
  return (
    <div onClick={props.onSquareClick} className={`cell r${props.i} c${props.j} ${selectedClass}`}>
      <GameCellValue {...props} />
    </div>
  )
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.board = new Board();

    this.state = {
      selectedSquare: [-1,-1],
      mode: "setMarks", // vs setValues
    }
    this.state.exportBoard = this.board.export();

  }

  updateStateBoard() {
    this.board.autoNotate();
    this.setState({
      exportBoard: this.board.export()
    })
  }

  onModeToggleClick(e) {
    console.log("onModeToggleClick");
    this.setState({
      mode: this.state.mode === "setMarks" ? "setVals" : "setMarks"
    });
  }
  onSquareClick(i,j) {

    this.setState({
      selectedSquare: [i,j]
    });

    console.log(`onSquareClick(${i},${j})`);
  }

  onNumberButtonClick(number) {
    console.log(`onNumberButtonClick ${number}`);

    const targetSq = this.state.selectedSquare;

    if (this.state.mode === "setMarks") {

      console.log('setMarks');
    }

    if (this.state.mode === "setVals") {
      this.board.setVal(targetSq[0], targetSq[1], parseInt(number));
      this.updateStateBoard();
      console.log('setVals');
    }


  }

  render() {
    return (
      <div className="game">
        <div className="board">
          <GameCells selectedSquare={this.state.selectedSquare} onSquareClick={this.onSquareClick.bind(this)} board={this.state.exportBoard} />
        </div>
        <div className="controls">
          <Controls mode={this.state.mode} onNumberButtonClick={this.onNumberButtonClick.bind(this)} onModeToggleClick={this.onModeToggleClick.bind(this)} />
        </div>
      </div>
    )
  }


}


export default Game;
