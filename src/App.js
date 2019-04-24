import React, { Component } from 'react';
import './App.css';
import './loanPaymentCalculator.css'
import './loanPaymentSummary.scss'
import LoanPaymentCalculator from './loanPaymentCalculator';

class App extends Component {
  render() {
    return (
      <div>
        YOU ARE IN APP.js
        <LoanPaymentCalculator />
      </div>
    );
  }
}

export default App;
