import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (display === '0' || shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (operator: string) => {
    setShouldResetDisplay(true);
    setEquation(display + ' ' + operator + ' ');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button = ({ children, onClick, className = '' }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`p-4 text-lg font-semibold rounded-xl transition-all duration-200 
      hover:bg-opacity-80 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-black p-6 rounded-2xl shadow-2xl w-full max-w-xs">
        <div className="mb-4">
          <div className="text-gray-400 text-right h-6 text-sm">
            {equation}
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <div className="text-right text-white text-3xl font-bold tracking-wider">
              {display}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button
            onClick={handleClear}
            className="bg-white text-black col-span-2 font-bold"
          >
            AC
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-zinc-800 text-white hover:bg-zinc-700"
          >
            <Delete className="w-6 h-6 mx-auto" />
          </Button>
          <Button
            onClick={() => handleOperator('/')}
            className="bg-zinc-800 text-white hover:bg-zinc-700"
          >
            <Divide className="w-6 h-6 mx-auto" />
          </Button>

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-zinc-900 text-white hover:bg-zinc-800"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperator('*')}
            className="bg-zinc-800 text-white hover:bg-zinc-700"
          >
            <X className="w-6 h-6 mx-auto" />
          </Button>

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-zinc-900 text-white hover:bg-zinc-800"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperator('-')}
            className="bg-zinc-800 text-white hover:bg-zinc-700"
          >
            <Minus className="w-6 h-6 mx-auto" />
          </Button>

          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-zinc-900 text-white hover:bg-zinc-800"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperator('+')}
            className="bg-zinc-800 text-white hover:bg-zinc-700"
          >
            <Plus className="w-6 h-6 mx-auto" />
          </Button>

          <Button
            onClick={() => handleNumber('0')}
            className="bg-zinc-900 text-white hover:bg-zinc-800 col-span-2"
          >
            0
          </Button>
          <Button
            onClick={() => handleNumber('.')}
            className="bg-zinc-900 text-white hover:bg-zinc-800"
          >
            .
          </Button>
          <Button
            onClick={handleEqual}
            className="bg-white text-black hover:bg-gray-100"
          >
            <Equal className="w-6 h-6 mx-auto" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;