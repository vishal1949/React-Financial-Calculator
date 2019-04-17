import React, {Component} from 'react'

class LoanPaymentIndex extends Component {
  constructor(props){
    super(props)
  }

  render(){
    debugger
    return(
      <div>
        {/* This month {this.props.payment} and first is {this.props.remainingLoan[1]} second is {this.props.remainingLoan[2]} */}
        this Month: {this.props.remainingLoan[this.props.id]}
      </div>
    )
  }
}

export default LoanPaymentIndex;