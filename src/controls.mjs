import React from 'react';
import './scss/controls.scss';

const NumberButtons = function(props) {
  const result = [];
  for (let i = 1; i < 10; i++) {
    result.push(<div key={`nb${i}`} className="numberButton">{i}</div>);
  }
  return result;
}

export class Controls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (<div>
             <NumberButtons />
            </div>);
  }

}

export default Controls;
