import React, {Component} from 'react'

class LoanPaymentIndex extends Component {
  constructor(props){
    super(props)
    this.remainingBalance = this.props.total - this.props.remainingLoan[this.props.id]
  }
  
  componentWillUpdate(){
    this.remainingBalance= this.props.total - this.props.remainingLoan[this.props.id]
  }

  render(){
    debugger
    return(
      <div>
        <div>
          Month {this.props.id}: {this.props.remainingLoan[this.props.id]}
        </div>
        <div>Remaining Balance: {this.remainingBalance}</div>
        <div>Interest Paid: {this.props.interest * this.props.id }</div>
      </div>
    )
  }
}

export default LoanPaymentIndex;