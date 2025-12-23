import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import './BootScreen.css';

const BootScreen = () => {
  const [logs, setLogs] = useState([]);

  const bootMessages = [
    '[ OK ] Starting WebOS Kernel 2025.1.0',
    '[ OK ] Loading system drivers',
    '[ OK ] Initializing virtual file system',
    '[ OK ] Starting network services',
    '[ OK ] Loading window manager',
    '[ OK ] Starting desktop environment',
    '[ OK ] System ready'
  ];

  useEffect(() => {
    bootMessages.forEach((msg, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, msg]);
      }, index * 400);
    });
  }, []);

  return (
    <div className="boot-screen">
      <div className="boot-content">
        <div className="boot-logo">
          <div className="logo-icon">
            <Globe size={96} />
          </div>
          <h1>WebOS</h1>
          <p>Browser Operating System v2025.1</p>
        </div>
        <div className="boot-logs">
          {logs.map((log, index) => (
            <div key={index} className="boot-log">{log}</div>
          ))}
        </div>
        <div className="boot-loader">
          <div className="loader-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
