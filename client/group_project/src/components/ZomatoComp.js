import React, { Component } from 'react';
class ZomatoComp extends Component {
  
    constructor(props) {
    super(props);
    // console.log('home ID' +  props.match.params.id )
    this.state = {
     savedData: this.props.zomatostuff,
    }
  }

componentWillMount() {
  console.log('wrokgin')
}

  render() {
    return (
     <div>
 
        
     </div>
    )
  }
}
export default ZomatoComp;

