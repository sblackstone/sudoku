import React from 'react';
import Board from './board.mjs';
import Controls from './controls.mjs';
import './scss/board.scss';
import './scss/game.scss';
import { Doughnut } from 'react-chartjs-2';

const Marks = function(props) {
    const labels = [];
    const fakeData = [];

    for (let i = 1; i < 10; i++) {
      labels.push(`${i}`);
      fakeData.push(props.marks[i] ? 1 : 0);
    }


    const data = {
    	labels: labels,
    	datasets: [{
    		data: fakeData,
        borderColor: '#000',
        borderWidth: 0,
    		backgroundColor: [
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'purple',
          'cyan',
          'brown',
          'gray'
    		]
    	}]
    };

    const opts = {
      legend:  { display: false },
      tooltips: { enabled: false }
    }

    return (
      <div className="marks">
        <Doughnut data={data} options={opts} onElementsClick={props.onElementsClick} width="2vmin" height="2vmin" />
      </div>
    )


}

const GameCellValue = function(props) {
  if (props.cell.value !== -1) {
    //return (<div className="cell-value">{props.cell.value}</div>);
    return (<div className="cell-value"></div>);
  } else {
    return (
      <Marks marks={props.cell.marks} onElementsClick={props.onElementsClick} />
    )
  }
}

const GameCells = function(props) {
  const ret = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const isSelected = props.selectedSquare[0] === i && props.selectedSquare[1] === j;

      const onEleClick = (function(ii, jj, oec) {
        return (e) => {
          oec(ii,jj, e);
        };
      })(i,j, props.onElementsClick);

      row.push(<GameCell onElementsClick={onEleClick} onSquareClick={()=> { props.onSquareClick(i,j); }} isSelected={isSelected} key={`${i}${j}`} cell={props.board[i][j]} i={i} j={j} selectedSquare={props.selectedSquare} selectedBox={props.selectedBox}/>);
    }
    ret.push(<tr>{row}</tr>);
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
    <td onClick={props.onSquareClick} className={`cell r${props.i} c${props.j} ${selectedClass} ${sameBoxClass} ${valClass}`}>
      <GameCellValue {...props} />
    </td>
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

  onElementsClick(i,j,e) {
    if (!this.board.rows[i][j].updateIfSingle()) {
      try {
        const k = e[0]._index;
        console.log(i,j,k);
        this.board.setMark(i,j,k+1,false);
        this.board.rows[i][j].updateIfSingle();
      } catch (err) {
        console.log(err);
      }

    }
    this.board.autoNotate();
    this.updateStateBoard();

  }

  updateSingles() {
    this.board.updateSingles();
    this.updateStateBoard();
  }

  updateStateBoard() {
    //this.board.autoNotate();

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
        <table className="board">
          <tbody>
            <GameCells onElementsClick={this.onElementsClick.bind(this)} selectedSquare={this.state.selectedSquare} onSquareClick={this.onSquareClick.bind(this)} board={this.state.exportBoard} selectedBox={this.state.selectedBox} />
          </tbody>
        </table>
        <div className="controls">
          <Controls mode={this.state.mode} onNumberButtonClick={this.onNumberButtonClick.bind(this)} onModeToggleClick={this.onModeToggleClick.bind(this)} />
        </div>
      </div>
    )
  }


}


export default Game;
