import { useState } from 'react';
import { Delete } from 'lucide-react';
import './CalculatorApp.css';

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperator = (op) => {
    const current = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        <button onClick={handleClear} className="calc-btn clear-btn">
          C
        </button>
        <button onClick={handleNumber.bind(null, 7)} className="calc-btn">7</button>
        <button onClick={handleNumber.bind(null, 8)} className="calc-btn">8</button>
        <button onClick={handleNumber.bind(null, 9)} className="calc-btn">9</button>
        <button onClick={() => handleOperator('÷')} className="calc-btn operator-btn">÷</button>
        <button onClick={handleNumber.bind(null, 4)} className="calc-btn">4</button>
        <button onClick={handleNumber.bind(null, 5)} className="calc-btn">5</button>
        <button onClick={handleNumber.bind(null, 6)} className="calc-btn">6</button>
        <button onClick={() => handleOperator('×')} className="calc-btn operator-btn">×</button>
        <button onClick={handleNumber.bind(null, 1)} className="calc-btn">1</button>
        <button onClick={handleNumber.bind(null, 2)} className="calc-btn">2</button>
        <button onClick={handleNumber.bind(null, 3)} className="calc-btn">3</button>
        <button onClick={() => handleOperator('-')} className="calc-btn operator-btn">-</button>
        <button onClick={handleNumber.bind(null, 0)} className="calc-btn zero-btn">0</button>
        <button onClick={handleDecimal} className="calc-btn">.</button>
        <button onClick={handleEquals} className="calc-btn equals-btn">=</button>
        <button onClick={() => handleOperator('+')} className="calc-btn operator-btn">+</button>
      </div>
    </div>
  );
};

export default CalculatorApp;
