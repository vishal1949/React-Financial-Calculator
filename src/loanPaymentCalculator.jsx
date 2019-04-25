import React, {Component} from 'react'
import LoanPaymentIndex from './loanPaymentIndex'
import LoanPaymentSummary from './loanPaymentSummary';
import { debug } from 'util';

class LoanPaymentCalculator extends Component {

  constructor(props){
    super(props);
    this.remainingLoan = {}; 
    this.moreInfo = false;
    this.totalPaid = 0;
    this.state = {
      payment: null,
      loanAmount: '',
      interestRate: '',  //will be percentage value
      numPeriods: '',
      totalPaid: 0,
      remainingLoan: {},
      test: null
    };

    this.update = this.update.bind(this);
    this.populateRemainingLoan = this.populateRemainingLoan.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMoreInfo = this.handleMoreInfo.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.numPeriods !== prevState.numPeriods){
      let result = Math.floor(this.calculatePayment() * 100) / 100;
      this.interest = Math.floor((result - (this.state.loanAmount / this.state.numPeriods)) * 100) / 100;
      this.totalPaid = Math.floor((result * this.state.numPeriods) * 100) / 100;
      this.setState({
        payment: result,
        totalPaid: this.totalPaid,
      });
      this.populateRemainingLoan(); 
    }
  }

  populateRemainingLoan(){
    this.remainingLoan = {};
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
      totalPaid: this.totalPaid,
    });
    this.populateRemainingLoan(); 
  }

  handleMoreInfo(e){
    e.preventDefault();
    let div = document.getElementById('more-info-table');
    let show = document.getElementById('show-text');
    if (this.moreInfo) {
      this.moreInfo = false;
      div.style.display = "none";
      show.innerHTML = 'Show more?'
    }else{
      this.moreInfo = true;
      div.style.display = "block";
      show.innerHTML = 'Show less?'
    }
  }

  displayResults(){
    if(!!this.state.payment){
      return(
        <div>
          <LoanPaymentSummary 
            totalLoan={this.state.loanAmount}
            loanWithInterest={this.state.payment*this.state.numPeriods}
            payment={this.state.payment}
          />
          <div id='show-text' onClick={(e) => {this.handleMoreInfo(e)}}>Show more?</div>
          <div id='more-info-table'>
            <div className='table-headers'>
              <h3>Month</h3>
              <h3>Paid Off</h3>
              <h3>Remaining Loan</h3>
              <h3>Interest Paid So Far!</h3>
            </div>
            <div className='scrollable-info'>
              {Object.keys(this.remainingLoan).map(key => {
                return <LoanPaymentIndex 
                          key={key} 
                          id={key} 
                          remainingLoan={this.remainingLoan} 
                          payment={this.state.payment} 
                          total={this.state.totalPaid}
                          loanAmount={this.state.loanAmount} 
                          interest={this.interest}
                        />
              })}
            </div>
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
        <h1 id='title'>Small Loan Payment Calculator</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='flex'>
            <div>
              <i class="fas fa-dollar-sign"></i>
              <input className='' type="text" value={this.state.loanAmount} onChange={this.update('loanAmount')} placeholder='Loan Amount($)'/>
            </div>
            <div>
              <input className='' type="text" value={this.state.interestRate} onChange={this.update('interestRate')} placeholder='Interest Rate(%)'/>
              <i class="fas fa-percent"></i>
            </div>
          </div>
          <div className='flex'>
            <div>
              <i class="fas fa-calendar-week"></i>
              <input className='input-field' type="text" value={this.state.numPeriods} onChange={this.update('numPeriods')} placeholder='Number of Months'/>
            </div>
            <div className='submit-button'>
              <input id='submit-this' type="submit" />
              <i class="fas fa-check-circle"></i>
            </div>
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
