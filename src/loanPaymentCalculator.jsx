import React, {Component} from 'react'


class LoanPaymentCalculator extends Component {

  constructor(props){
    super(props);

    this.state = {
      payment: null,
      loanAmount: null,
      interestRate: null,  //will be percentage value
      numPeriods: null,
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let top = this.state.loanAmount * this.state.interestRate / 100;
    let bottom = 1 - Math.pow(( 1 + this.state.interestRate / 100), (this.state.numPeriods * -1 ))
    let result = top/bottom;
    this.setState({
      payment: result
    });
  }

  displayResults(){
    if(!!this.state.payment){
      return(
        <div>
          The Results are = {this.state.payment}
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