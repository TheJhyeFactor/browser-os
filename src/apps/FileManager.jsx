import { useState, useEffect } from 'react';
import { Folder, FileText, Home, ArrowLeft } from 'lucide-react';
import { listDirectory, getItemInfo, readFile } from '../utils/fileSystem';
import './FileManager.css';

const FileManager = () => {
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [items, setItems] = useState([]);

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
  };

  const handleItemClick = (item) => {
    if (item.type === 'directory') {
      setCurrentPath(item.path);
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

      <div className="file-manager-content">
        {items.length === 0 ? (
          <div className="empty-folder">Empty folder</div>
        ) : (
          <div className="file-grid">
            {items.map(item => (
              <div
                key={item.path}
                className="file-item"
                onDoubleClick={() => handleItemClick(item)}
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
    </div>
  );
};

export default FileManager;
