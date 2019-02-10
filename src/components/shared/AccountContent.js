import React, {Component} from "react";
import { withRouter} from 'react-router-dom';

class AccountContent extends Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick (){
    this.props.history.push('/signup');
  }
  render(){

  
  return (
    <React.Fragment>
      <div className="service-information">
        <h1><span>Just Call </span>(0908754647846)</h1>
        <p>
          We are always ready for your service
        </p>
        <button onClick ={this.handleClick}>SendIT Today</button>
      </div>
    </React.Fragment>
  );
  }
};

export default withRouter(AccountContent);
