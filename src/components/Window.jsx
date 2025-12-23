import { useState, useRef, useEffect } from 'react';
import { X, Minimize, Maximize2 } from 'lucide-react';
import './Window.css';

const Window = ({ id, title, x, y, width, height, zIndex, onClose, onMinimize, onFocus, onMove, onResize, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        onMove(id, Math.max(0, newX), Math.max(0, newY));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, id, onMove]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y
    });
    onFocus();
  };

  return (
    <div
      ref={windowRef}
      className="window"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex
      }}
      onMouseDown={onFocus}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <span className="window-title">{title}</span>
        <div className="window-controls">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="window-btn minimize-btn"
          >
            <Minimize size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="window-btn close-btn"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};

export default Window;
