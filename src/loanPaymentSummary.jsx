import React, {Component} from 'react';

class LoanPaymentSummary extends Component{
  constructor(props){
    super(props)
    
  }

  render(){
    return(
      <div>
        <h2 id='summary-title'>Overall Summary of Loan</h2>
        <div className='flex'>
          <div id='summary'>
            <div id='align-left'>Total Loan: </div>
            <div>${Math.floor(this.props.totalLoan * 100) / 100}</div>
            <div id='align-left'>Total Loan w/Interest: </div>
            <div>${Math.floor(this.props.loanWithInterest * 100) / 100}</div>
            <div id='align-left'>Monthly Payment: </div>
            <div>${this.props.payment}</div>
            <div id='align-left'>Total Interest Charged: </div>
            <div>${Math.floor((this.props.loanWithInterest - this.props.totalLoan) * 100) / 100}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoanPaymentSummary;