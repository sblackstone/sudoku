import React from 'react';
import './scss/controls.scss';

export class Controls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (<React.Fragment>
            {this.props.score}
            </React.Fragment>);
  }

}

export default Controls;
