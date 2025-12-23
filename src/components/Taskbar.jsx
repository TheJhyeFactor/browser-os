import { useState } from 'react';
import { Menu, Search, Wifi, Volume2, Battery } from 'lucide-react';
import './Taskbar.css';

const Taskbar = ({ windows, apps, onAppClick, onWindowClick, time }) => {
  const [showStartMenu, setShowStartMenu] = useState(false);

  const formatTime = () => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = () => {
    return time.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="taskbar">
      <div className="taskbar-start">
        <button
          className={`start-btn ${showStartMenu ? 'active' : ''}`}
          onClick={() => setShowStartMenu(!showStartMenu)}
        >
          <Menu size={20} />
          <span>Start</span>
        </button>

        {showStartMenu && (
          <div className="start-menu">
            <div className="start-menu-header">
              <h3>Applications</h3>
            </div>
            <div className="start-menu-apps">
              {apps.map(app => (
                <button
                  key={app.id}
                  className="start-menu-item"
                  onClick={() => {
                    onAppClick(app.id);
                    setShowStartMenu(false);
                  }}
                >
                  <app.icon size={20} />
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="taskbar-center">
        {windows.map(window => (
          <button
            key={window.id}
            className={`taskbar-window ${window.minimized ? '' : 'active'}`}
            onClick={() => onWindowClick(window.id)}
          >
            {window.title}
          </button>
        ))}
      </div>

      <div className="taskbar-end">
        <div className="system-tray">
          <Wifi size={16} />
          <Volume2 size={16} />
          <Battery size={16} />
        </div>
        <div className="clock">
          <div className="clock-time">{formatTime()}</div>
          <div className="clock-date">{formatDate()}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
