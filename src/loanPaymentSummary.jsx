import React, {Component} from 'react';

class LoanPaymentSummary extends Component{
  constructor(props){
    super(props)
    
  }

  render(){
    return(
      <div className='flex'>
        <div id='summary'>
          <div>Total Loan: </div>
          <div>{Math.floor(this.props.totalLoan * 100) / 100}</div>
          <div>Total loan with interest </div>
          <div>{Math.floor(this.props.loanWithInterest * 100) / 100}</div>
          <div>Monthly Payment </div>
          <div>{this.props.payment}</div>
          <div>Total interest charged </div>
          <div>{Math.floor((this.props.loanWithInterest - this.props.totalLoan) * 100) / 100}</div>
        </div>
      </div>
    )
  }
}

export default LoanPaymentSummary;