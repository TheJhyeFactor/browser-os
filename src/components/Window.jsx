import { useState, useRef, useEffect } from 'react';
import './Window.css';

const Window = ({ id, title, x, y, width, height, zIndex, onClose, onMinimize, onFocus, onMove, onResize, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        onMove(id, Math.max(0, newX), Math.max(0, newY));
      } else if (isResizing && resizeDirection) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;

        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = x;
        let newY = y;

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(300, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(200, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes('w')) {
          const widthChange = resizeStart.width - deltaX;
          if (widthChange >= 300) {
            newWidth = widthChange;
            newX = x + deltaX;
          }
        }
        if (resizeDirection.includes('n')) {
          const heightChange = resizeStart.height - deltaY;
          if (heightChange >= 200) {
            newHeight = heightChange;
            newY = y + deltaY;
          }
        }

        onResize(id, newWidth, newHeight);
        if (newX !== x || newY !== y) {
          onMove(id, newX, newY);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeDirection, resizeStart, id, onMove, onResize, x, y]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y
    });
    onFocus();
  };

  const handleResizeStart = (e, direction) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: width,
      height: height
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
        <div className="window-controls">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="window-btn close-btn"
            title="Close"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="window-btn minimize-btn"
            title="Minimize"
          />
          <button
            className="window-btn maximize-btn"
            title="Maximize"
          />
        </div>
        <span className="window-title">{title}</span>
      </div>
      <div className="window-content">
        {children}
      </div>

      {/* Resize handles */}
      <div className="resize-handle resize-n" onMouseDown={(e) => handleResizeStart(e, 'n')} />
      <div className="resize-handle resize-s" onMouseDown={(e) => handleResizeStart(e, 's')} />
      <div className="resize-handle resize-e" onMouseDown={(e) => handleResizeStart(e, 'e')} />
      <div className="resize-handle resize-w" onMouseDown={(e) => handleResizeStart(e, 'w')} />
      <div className="resize-handle resize-ne" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
      <div className="resize-handle resize-nw" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
      <div className="resize-handle resize-se" onMouseDown={(e) => handleResizeStart(e, 'se')} />
      <div className="resize-handle resize-sw" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
    </div>
  );
};

export default Window;
