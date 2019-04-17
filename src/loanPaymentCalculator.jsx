import React, {Component} from 'react'


class LoanPaymentCalculator extends Component {

  constructor(props){
    super(props);
    this.remainingLoan = {}; //keep look up O(1)
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
    this.remainingLoan[1] = this.state.payment;
    let accumulator = this.calculatePayment();
    for(let i = 1; i < this.state.numPeriods; i++){
      accumulator += accumulator;
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
    this.setState({
      payment: result
    });
    this.populateRemainingLoan();
  }

  displayResults(){
    if(!!this.state.payment){
      return(
        <div>
          The Results are = {this.state.payment} and first is {this.remainingLoan[1]} second is {this.remainingLoan[2]}
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