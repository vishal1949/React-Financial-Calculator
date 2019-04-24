import React, {Component} from 'react';

class LoanPaymentSummary extends Component{
  constructor(props){
    super(props)
    
  }

  render(){
    return(
      <div>
        <div>Total Loan {Math.floor(this.props.totalLoan * 100) / 100}</div>
        <div>Total loan with interest {Math.floor(this.props.loanWithInterest * 100) / 100}</div>
        <div>Monthly Payment {this.props.payment}</div>
        <div>Total interest charged {Math.floor((this.props.loanWithInterest - this.props.totalLoan) * 100) / 100}</div>
      </div>
    )
  }
}

export default LoanPaymentSummary;