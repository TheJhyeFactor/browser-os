import { Monitor, Cpu, HardDrive, Wifi, Chrome } from 'lucide-react';
import './SystemInfo.css';

const SystemInfo = () => {
  const systemData = {
    os: 'WebOS 2025.1.0',
    kernel: 'Browser Kernel',
    browser: navigator.userAgent.split(' ').pop(),
    platform: navigator.platform,
    memory: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown',
    cores: navigator.hardwareConcurrency || 'Unknown',
    language: navigator.language,
    online: navigator.onLine ? 'Connected' : 'Offline',
    screen: `${window.screen.width}x${window.screen.height}`,
    buildDate: '2025-01-01'
  };

  const infoSections = [
    {
      title: 'System',
      icon: Monitor,
      items: [
        { label: 'Operating System', value: systemData.os },
        { label: 'Kernel', value: systemData.kernel },
        { label: 'Build Date', value: systemData.buildDate }
      ]
    },
    {
      title: 'Hardware',
      icon: Cpu,
      items: [
        { label: 'Platform', value: systemData.platform },
        { label: 'CPU Cores', value: systemData.cores },
        { label: 'Memory', value: systemData.memory },
        { label: 'Screen Resolution', value: systemData.screen }
      ]
    },
    {
      title: 'Network',
      icon: Wifi,
      items: [
        { label: 'Status', value: systemData.online },
        { label: 'Language', value: systemData.language }
      ]
    },
    {
      title: 'Browser',
      icon: Chrome,
      items: [
        { label: 'User Agent', value: systemData.browser }
      ]
    }
  ];

  return (
    <div className="system-info">
      <div className="system-header">
        <Monitor size={64} />
        <div>
          <h2>WebOS</h2>
          <p>Browser Operating System v2025.1</p>
        </div>
      </div>

      <div className="system-sections">
        {infoSections.map((section, index) => (
          <div key={index} className="system-section">
            <div className="section-title">
              <section.icon size={20} />
              <h3>{section.title}</h3>
            </div>
            <div className="section-items">
              {section.items.map((item, idx) => (
                <div key={idx} className="info-row">
                  <span className="info-label">{item.label}:</span>
                  <span className="info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="system-footer">
        <p>Built with React • Powered by WebAssembly</p>
        <p>© 2025 WebOS Project - Open Source</p>
      </div>
    </div>
  );
};

export default SystemInfo;
