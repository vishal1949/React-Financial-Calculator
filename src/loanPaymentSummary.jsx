import React, {Component} from 'react';

class LoanPaymentSummary extends Component{
  constructor(props){
    super(props)
    
  }

  render(){
    return(
      <div>
        <div>
          <div>Total Loan: {Math.floor(this.props.totalLoan * 100) / 100}</div>
          <div>Total loan with interest {Math.floor(this.props.loanWithInterest * 100) / 100}</div>
          <div>Monthly Payment {this.props.payment}</div>
          <div>Total interest charged {Math.floor((this.props.loanWithInterest - this.props.totalLoan) * 100) / 100}</div>
          <div>---------------------------------------------</div>
        </div>
        <div class="igFrameBar">
          <div class="igData igData1"></div>
          <div class="igData igData2"></div>
          <div class="igData igData3"></div>
          <div class="igData igData4"></div>
          <div class="igData igData5"></div>
          <div class="igData igData6"></div>
          <div class="igData igData7"></div>
          <div class="igData igData8"></div>
          <div class="igData igData9"></div>
          <div class="igData igData10"></div>
        </div>
      </div>
    )
  }
}

export default LoanPaymentSummary;