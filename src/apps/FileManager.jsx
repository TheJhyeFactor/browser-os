import { useState, useEffect } from 'react';
import { Folder, FileText, Home, ArrowLeft, Eye } from 'lucide-react';
import { listDirectory, getItemInfo, readFile } from '../utils/fileSystem';
import './FileManager.css';

const FileManager = () => {
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [items, setItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath]);

  const loadDirectory = (path) => {
    const contents = listDirectory(path);
    if (!contents) return;

    const itemsWithInfo = contents.map(name => {
      const itemPath = path === '/' ? `/${name}` : `${path}/${name}`;
      const info = getItemInfo(itemPath);
      return {
        name,
        path: itemPath,
        ...info
      };
    });

    setItems(itemsWithInfo);
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleItemClick = (item) => {
    if (item.type === 'directory') {
      setCurrentPath(item.path);
      setFilePreview(null);
    } else {
      setSelectedFile(item);
      const content = readFile(item.path);
      setFilePreview(content);
    }
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === 'directory') {
      setCurrentPath(item.path);
    } else {
      const content = readFile(item.path);
      alert(`File: ${item.name}\n\n${content}`);
    }
  };

  const handleBack = () => {
    if (currentPath === '/') return;
    const pathParts = currentPath.split('/').filter(p => p);
    pathParts.pop();
    setCurrentPath('/' + pathParts.join('/'));
  };

  const handleHome = () => {
    setCurrentPath('/home/user');
  };

  return (
    <div className="file-manager">
      <div className="file-manager-toolbar">
        <button onClick={handleBack} disabled={currentPath === '/'} title="Back">
          <ArrowLeft size={18} />
        </button>
        <button onClick={handleHome} title="Home">
          <Home size={18} />
        </button>
        <div className="path-display">{currentPath}</div>
      </div>

      <div className="file-manager-main">
        <div className="file-manager-content">
          {items.length === 0 ? (
            <div className="empty-folder">Empty folder</div>
          ) : (
            <div className="file-grid">
              {items.map(item => (
                <div
                  key={item.path}
                  className={`file-item ${selectedFile?.path === item.path ? 'selected' : ''}`}
                  onClick={() => handleItemClick(item)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                >
                  <div className="file-icon">
                    {item.type === 'directory' ? (
                      <Folder size={48} />
                    ) : (
                      <FileText size={48} />
                    )}
                  </div>
                  <div className="file-name">{item.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filePreview && selectedFile && (
          <div className="file-preview">
            <div className="preview-header">
              <Eye size={16} />
              <span>{selectedFile.name}</span>
            </div>
            <div className="preview-content">
              <pre>{filePreview}</pre>
            </div>
            <div className="preview-footer">
              <span>Double-click to view in alert</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager;
