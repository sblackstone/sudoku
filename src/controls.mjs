import React from 'react';
import './scss/controls.scss';

const NumberButtons = function(props) {
  const result = [];
  for (let i = 1; i < 10; i++) {
    result.push(<div onClick={()=> { props.onNumberButtonClick(i); }} key={`nb${i}`} className="numberButton">{i}</div>);
  }
  return result;
}

const ModeToggle = function(props) {
  return(<div className="mode-toggle-button" onClick={props.onModeToggleClick} >MT</div>);
}
export class Controls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (<div>
             <NumberButtons {...this.props} />
             <ModeToggle {...this.props} />
            </div>);
  }

}

export default Controls;
