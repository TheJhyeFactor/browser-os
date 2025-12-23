import { useState, useEffect } from 'react';
import { Terminal, Folder, FileText, Calculator, Info, Monitor } from 'lucide-react';
import Window from './Window';
import Taskbar from './Taskbar';
import TerminalApp from '../apps/TerminalApp';
import FileManager from '../apps/FileManager';
import TextEditor from '../apps/TextEditor';
import CalculatorApp from '../apps/CalculatorApp';
import SystemInfo from '../apps/SystemInfo';
import { initFileSystem } from '../utils/fileSystem';
import './Desktop.css';

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    initFileSystem();
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = [
    { id: 'terminal', name: 'Terminal', icon: Terminal, component: TerminalApp },
    { id: 'files', name: 'Files', icon: Folder, component: FileManager },
    { id: 'editor', name: 'Editor', icon: FileText, component: TextEditor },
    { id: 'calculator', name: 'Calculator', icon: Calculator, component: CalculatorApp },
    { id: 'system', name: 'System', icon: Info, component: SystemInfo }
  ];

  const openApp = (appId) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    const existingWindow = windows.find(w => w.appId === appId && !w.allowMultiple);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const newWindow = {
      id: Date.now(),
      appId: app.id,
      title: app.name,
      component: app.component,
      x: 50 + (windows.length * 30),
      y: 50 + (windows.length * 30),
      width: appId === 'calculator' ? 320 : 800,
      height: appId === 'calculator' ? 450 : 600,
      zIndex: nextZIndex,
      minimized: false
    };

    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setWindows(windows.map(w =>
      w.id === id ? { ...w, minimized: true } : w
    ));
  };

  const maximizeWindow = (id) => {
    setWindows(windows.map(w => {
      if (w.id === id) {
        if (w.maximized) {
          return {
            ...w,
            maximized: false,
            x: w.previousX,
            y: w.previousY,
            width: w.previousWidth,
            height: w.previousHeight
          };
        } else {
          return {
            ...w,
            maximized: true,
            previousX: w.x,
            previousY: w.y,
            previousWidth: w.width,
            previousHeight: w.height,
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight - 48
          };
        }
      }
      return w;
    }));
  };

  const restoreWindow = (id) => {
    setWindows(windows.map(w =>
      w.id === id ? { ...w, minimized: false, zIndex: nextZIndex } : w
    ));
    setNextZIndex(nextZIndex + 1);
  };

  const bringToFront = (id) => {
    setWindows(windows.map(w =>
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(nextZIndex + 1);
  };

  const updateWindowPosition = (id, x, y) => {
    setWindows(windows.map(w =>
      w.id === id ? { ...w, x, y } : w
    ));
  };

  const updateWindowSize = (id, width, height) => {
    setWindows(windows.map(w =>
      w.id === id ? { ...w, width, height } : w
    ));
  };

  const desktopIcons = [
    { id: 'terminal', name: 'Terminal', icon: Terminal },
    { id: 'files', name: 'Files', icon: Folder },
    { id: 'editor', name: 'Editor', icon: FileText },
    { id: 'calculator', name: 'Calculator', icon: Calculator }
  ];

  return (
    <div className="desktop">
      <div className="desktop-watermark">TheJhyeFactor</div>

      <div className="desktop-icons">
        {desktopIcons.map(icon => (
          <div
            key={icon.id}
            className="desktop-icon"
            onDoubleClick={() => openApp(icon.id)}
          >
            <icon.icon size={48} />
            <span>{icon.name}</span>
          </div>
        ))}
      </div>

      {windows.filter(w => !w.minimized).map(window => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          x={window.x}
          y={window.y}
          width={window.width}
          height={window.height}
          zIndex={window.zIndex}
          maximized={window.maximized}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
          onMove={updateWindowPosition}
          onResize={updateWindowSize}
        >
          <window.component />
        </Window>
      ))}

      <Taskbar
        windows={windows}
        apps={apps}
        onAppClick={openApp}
        onWindowClick={restoreWindow}
        time={time}
      />
    </div>
  );
};

export default Desktop;
