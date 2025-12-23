import { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import BootScreen from './components/BootScreen';
import './App.css';

function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBooting(false);
    }, 3000);

    return () => clearTimeout(bootTimer);
  }, []);

  return (
    <div className="app">
      {booting ? <BootScreen /> : <Desktop />}
    </div>
  );
}

export default App;
