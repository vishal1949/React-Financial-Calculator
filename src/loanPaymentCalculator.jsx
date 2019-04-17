import React, {Component} from 'react'
import LoanPaymentIndex from './loanPaymentIndex'

class LoanPaymentCalculator extends Component {

  constructor(props){
    super(props);
    this.remainingLoan = {}; //keep look up O(1)
    this.totalPaid = 0;
    this.state = {
      payment: null,
      loanAmount: null,
      interestRate: null,  //will be percentage value
      numPeriods: null,
    };

    this.update = this.update.bind(this);
    this.populateRemainingLoan = this.populateRemainingLoan.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  populateRemainingLoan(){
    this.remainingLoan[1] = this.calculatePayment();
    let accumulator = this.calculatePayment();
    for(let i = 1; i < this.state.numPeriods; i++){
      accumulator += this.calculatePayment();
      this.remainingLoan[i+1] = accumulator;
    }
  }

  calculatePayment(){
    let top = this.state.loanAmount * this.state.interestRate / 100;
    let bottom = 1 - Math.pow((1 + this.state.interestRate / 100), (this.state.numPeriods * -1));
    return top / bottom;
  }

  handleSubmit(e){
    e.preventDefault();
    let result = this.calculatePayment();
    this.interest = result - (this.state.loanAmount/this.state.numPeriods);
    this.totalPaid = result * this.state.numPeriods;
    this.setState({
      payment: result
    });
    this.populateRemainingLoan();
  }

  displayResults(){
    if(!!this.state.payment){
      return(
        <div>
          {Object.keys(this.remainingLoan).map(key => {
            return <LoanPaymentIndex 
                      key={key} 
                      remainingLoan={this.remainingLoan} 
                      id={key} 
                      payment={this.state.payment} 
                      total={this.totalPaid}
                      loanAmount={this.state.loanAmount} 
                      interest={this.interest}
                    />
          })}
        </div>
      )
    }
  }

  update(field){
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  } 

  

  
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.loanAmount} onChange={this.update('loanAmount')} placeholder='Loan Amount'/>
          <br/>
          <input type="text" value={this.state.interestRate} onChange={this.update('interestRate')} placeholder='Interest Rate %'/>
          <br />
          <input type="text" value={this.state.numPeriods} onChange={this.update('numPeriods')} placeholder='Number of Months'/>
          <input type="submit" />
        </form>
        <div>
          {this.displayResults()}
        </div>
      </div>
    )
  }


}

export default LoanPaymentCalculator;