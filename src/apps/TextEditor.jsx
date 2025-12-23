import { useState } from 'react';
import { Save, FileText, File, Moon, Sun } from 'lucide-react';
import { writeFile } from '../utils/fileSystem';
import './TextEditor.css';

const TextEditor = () => {
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('untitled.txt');
  const [saved, setSaved] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [lineCount, setLineCount] = useState(1);
  const [charCount, setCharCount] = useState(0);

  const handleSave = () => {
    const path = `/home/user/${filename}`;
    writeFile(path, content);
    setSaved(true);

    // Show success message
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.textContent = `✓ Saved to ${path}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setSaved(false);
    setLineCount(newContent.split('\n').length);
    setCharCount(newContent.length);
  };

  return (
    <div className={`text-editor ${darkMode ? 'dark' : 'light'}`}>
      <div className="editor-toolbar">
        <div className="editor-file-info">
          <File size={16} className="file-icon" />
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="filename-input"
          />
          {!saved && <span className="unsaved-indicator" title="Unsaved changes">●</span>}
        </div>

        <div className="editor-actions">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={handleSave} className="save-btn">
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="editor-main">
        <div className="line-numbers">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="line-number">{i + 1}</div>
          ))}
        </div>
        <textarea
          value={content}
          onChange={handleContentChange}
          className="editor-textarea"
          placeholder="Start typing your document here..."
          spellCheck={false}
        />
      </div>

      <div className="editor-statusbar">
        <div className="statusbar-left">
          <span className="status-item">Lines: {lineCount}</span>
          <span className="status-item">Characters: {charCount}</span>
        </div>
        <div className="statusbar-right">
          <span className="status-item">Plain Text</span>
          <span className="status-item">UTF-8</span>
          <span className="status-item">{darkMode ? 'Dark' : 'Light'} Theme</span>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
