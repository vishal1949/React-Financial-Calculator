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
      <div>
        <div>
          Month {this.props.id}: {this.props.remainingLoan[this.props.id].toFixed(2)}
        </div>
        <div>Remaining Balance: {this.remainingBalance.toFixed(2)}</div>
        <div>Interest Paid: {(this.props.interest * this.props.id).toFixed(2) }</div>
        <div>--------------------------------------------------</div>
      </div>
    )
  }
}

export default LoanPaymentIndex;