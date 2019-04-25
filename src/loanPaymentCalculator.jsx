import React, {Component} from 'react'
import LoanPaymentIndex from './loanPaymentIndex'
import LoanPaymentSummary from './loanPaymentSummary';

class LoanPaymentCalculator extends Component {

  constructor(props){
    super(props);
    this.remainingLoan = {}; //keep look up O(1) 

    //Might have to change remainging loan to state! for the rerender

    this.totalPaid = 0;
    this.state = {
      payment: null,
      loanAmount: '',
      interestRate: '',  //will be percentage value
      numPeriods: '',
    };

    this.update = this.update.bind(this);
    this.populateRemainingLoan = this.populateRemainingLoan.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  populateRemainingLoan(){
    this.remainingLoan[1] = Math.floor(this.calculatePayment() * 100) / 100;
    let accumulator = Math.floor(this.calculatePayment() * 100) / 100;
    for(let i = 1; i < this.state.numPeriods; i++){
      accumulator += this.calculatePayment();
      this.remainingLoan[i+1] = accumulator;
    }
  }

  calculatePayment(){
    let top = this.state.loanAmount * this.state.interestRate / 100;
    let bottom = 1 - Math.pow((1 + this.state.interestRate / 100), (this.state.numPeriods * -1));
    return Math.floor(top / bottom * 100) / 100;
  }

  handleSubmit(e){
    e.preventDefault();
    let result = Math.floor(this.calculatePayment() * 100) / 100;
    this.interest = Math.floor((result - (this.state.loanAmount/this.state.numPeriods)) * 100) / 100;
    this.totalPaid = Math.floor((result * this.state.numPeriods) * 100) / 100;
    this.setState({
      payment: result,
    });
    this.populateRemainingLoan();
  }

  // componentWillUnmount(){
  //   // this.remainingLoan = {}
  // }

  displayResults(){
    if(!!this.state.payment){
      return(
        <div>
          <LoanPaymentSummary 
            totalLoan={this.state.loanAmount}
            loanWithInterest={this.state.payment*this.state.numPeriods}
            payment={this.state.payment}
          />
          <div>
            {Object.keys(this.remainingLoan).map(key => {
              return <LoanPaymentIndex 
                        key={key} 
                        id={key} 
                        remainingLoan={this.remainingLoan} 
                        payment={this.state.payment} 
                        total={this.totalPaid}
                        loanAmount={this.state.loanAmount} 
                        interest={this.interest}
                      />
            })}
          </div>
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

      <div id='calculator-form'>
        <h1 id='title'>Loan Payment Calculator</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='flex'>
            <input className='input-field' type="text" value={this.state.loanAmount} onChange={this.update('loanAmount')} placeholder='Loan Amount'/>
            <input className='input-field' type="text" value={this.state.interestRate} onChange={this.update('interestRate')} placeholder='Interest Rate %'/>
          </div>
          <div className='flex'>
            <input className='input-field' type="text" value={this.state.numPeriods} onChange={this.update('numPeriods')} placeholder='Number of Months'/>
            <input id='submit-this' type="submit" />
          </div>
        </form>
        <div>
          {this.displayResults()}
        </div>
      </div>
    )
  }
}

export default LoanPaymentCalculator;
