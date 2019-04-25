import React, {Component} from 'react';

class LoanPaymentIndex extends Component {
  constructor(props){
    super(props)
    this.remainingBalance = this.props.total - this.props.remainingLoan[this.props.id]
  }
  
  componentWillUpdate(){
    this.remainingBalance = 0;
    this.remainingBalance= this.props.total - this.props.remainingLoan[this.props.id]
  }

  render(){
    return(
      <div className='each-month-info'>
        <div>{this.props.id}</div>
        <div>{this.props.remainingLoan[this.props.id].toFixed(2)}</div>
        <div>{this.remainingBalance.toFixed(2)}</div>
        <div>{(this.props.interest * this.props.id).toFixed(2) }</div>
      </div>
    )
  }
}

export default LoanPaymentIndex;