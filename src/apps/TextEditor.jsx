import { useState } from 'react';
import { Save, FileText } from 'lucide-react';
import { writeFile } from '../utils/fileSystem';
import './TextEditor.css';

const TextEditor = () => {
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('untitled.txt');
  const [saved, setSaved] = useState(true);

  const handleSave = () => {
    const path = `/home/user/${filename}`;
    writeFile(path, content);
    setSaved(true);
    alert(`File saved to ${path}`);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setSaved(false);
  };

  return (
    <div className="text-editor">
      <div className="editor-toolbar">
        <div className="editor-file-info">
          <FileText size={18} />
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="filename-input"
          />
          {!saved && <span className="unsaved-indicator">●</span>}
        </div>
        <button onClick={handleSave} className="save-btn">
          <Save size={18} />
          Save
        </button>
      </div>
      <textarea
        value={content}
        onChange={handleContentChange}
        className="editor-textarea"
        placeholder="Start typing..."
        spellCheck={false}
      />
    </div>
  );
};

export default TextEditor;
