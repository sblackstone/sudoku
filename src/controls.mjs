import React from 'react';
import './scss/controls.scss';

const NumberButtons = function(props) {
  const result = [];
  for (let i = 1; i < 10; i++) {
    const btnClass = `btn_${i}`;
    //result.push(<div onClick={()=> { props.onNumberButtonClick(i); }} key={`nb${i}`} className={`numberButton ${btnClass}`}>{i}</div>);
    result.push(<div onClick={()=> { props.onNumberButtonClick(i); }} key={`nb${i}`} className={`numberButton ${btnClass}`}></div>);
  }
  return result;
}

const ModeToggle = function(props) {
  return(<div className="modeToggleButton" onClick={props.onModeToggleClick}>{props.mode}</div>);
}
export class Controls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (<React.Fragment>
             <NumberButtons {...this.props} />
             <ModeToggle {...this.props} />
            </React.Fragment>);
  }

}

export default Controls;
