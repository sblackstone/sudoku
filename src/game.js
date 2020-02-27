import React from 'react';
import Board from './board.mjs';
import Controls from './controls.mjs';
import './scss/board.scss';
import './scss/game.scss';

const Marks = function(props) {
    const markClasses = [];
    for (let i = 1; i < 10; i++) {
      markClasses[i] = props.marks[i] ? `mark_${i}` : "";
    }


    return(
      <div className="marks">

        <div className={`mark ${markClasses[1]}`}>{props.marks[1] ? "1" : ""}</div>
        <div className={`mark ${markClasses[2]}`}>{props.marks[2] ? "2" : ""}</div>
        <div className={`mark ${markClasses[3]}`}>{props.marks[3] ? "3" : ""}</div>
        <div className="break"></div>
        <div className={`mark ${markClasses[4]}`}>{props.marks[4] ? "4" : ""}</div>
        <div className={`mark ${markClasses[5]}`}>{props.marks[5] ? "5" : ""}</div>
        <div className={`mark ${markClasses[6]}`}>{props.marks[6] ? "6" : ""}</div>
        <div className="break"></div>
        <div className={`mark ${markClasses[7]}`}>{props.marks[7] ? "7" : ""}</div>
        <div className={`mark ${markClasses[8]}`}>{props.marks[8] ? "8" : ""}</div>
        <div className={`mark ${markClasses[9]}`}>{props.marks[9] ? "9" : ""}</div>
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
      ret.push(<GameCell onSquareClick={()=> { props.onSquareClick(i,j); }} isSelected={isSelected} key={`${i}${j}`} cell={props.board[i][j]} i={i} j={j} selectedSquare={props.selectedSquare} selectedBox={props.selectedBox}/>);
    }
    ret.push(<div className="break"></div>)
  }
  return ret;
}

const GameCell = function(props) {
  let selectedClass = "";
  let sameBoxClass  = "";

  if (props.isSelected) {
    selectedClass="selectedSquare";
  } else {
    if (props.i === props.selectedSquare[0]) {
      sameBoxClass = "relatedSquare";
    }
    if (props.j === props.selectedSquare[1]) {
      sameBoxClass = "relatedSquare";
    }

    const box =  Math.floor(props.i / 3) * 3 + Math.floor(props.j /3);

    if (box === props.selectedBox) {
      sameBoxClass = "relatedSquare";
    }

  }

  const valClass = props.cell.value === -1 ? "" : `value value_${props.cell.value}`;

  return (
    <div onClick={props.onSquareClick} className={`cell r${props.i} c${props.j} ${selectedClass} ${sameBoxClass} ${valClass}`}>
      <GameCellValue {...props} />
    </div>
  )
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    window.game = this;
    this.board = new Board();

    this.state = {
      selectedSquare: [-1,-1],
      mode: "setMarks", // vs setValues
      exportBoard:  this.board.export(),
      selectedBox: -1
    }

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
    const newBox = this.board.boxNumberForSquare(i,j);
    this.setState({
      selectedSquare: [i,j],
      selectedBox: newBox
    });
  }

  onNumberButtonClick(number) {

    const targetSq = this.state.selectedSquare;
    const i = targetSq[0];
    const j = targetSq[1];
    const k = parseInt(number);
    console.log(`onNumberButtonClick (${i},${j}) k=${k}}`);

    if (i === -1 || j === -1) {
      return;
    }
    if (this.state.mode === "setMarks") {
      const cur = this.board.getMark(i,j,k);
      this.board.setMark(i,j,k,!cur);
      this.updateStateBoard();
      return;
    }

    if (this.state.mode === "setVals") {
      this.board.setVal(targetSq[0], targetSq[1], k);
      this.updateStateBoard();
      return;
    }


  }

  render() {
    return (
      <div className="game">
        <div className="board">
          <GameCells selectedSquare={this.state.selectedSquare} onSquareClick={this.onSquareClick.bind(this)} board={this.state.exportBoard} selectedBox={this.state.selectedBox} />
        </div>
        <div className="controls">
          <Controls mode={this.state.mode} onNumberButtonClick={this.onNumberButtonClick.bind(this)} onModeToggleClick={this.onModeToggleClick.bind(this)} />
        </div>
      </div>
    )
  }


}


export default Game;
