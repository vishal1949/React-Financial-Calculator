import React, { Component } from 'react';
import './App.css';

import './loanPaymentCalculator.css';
import './loanPaymentSummary.scss';
import './loanPaymentIndex.scss';
import LoanPaymentCalculator from './loanPaymentCalculator';

class App extends Component {
  render() {
    return (
      <div>
        <LoanPaymentCalculator />
      </div>
    );
  }
}

export default App;
