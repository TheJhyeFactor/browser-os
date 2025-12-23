# WebOS - Browser Operating System

A fully functional operating system running entirely in your browser! Experience a complete desktop environment with window management, terminal, file system, and built-in applications.

## Features

### Desktop Environment
- **Window Management**: Draggable windows with minimize/close controls
- **Taskbar**: Windows-like taskbar with start menu and system tray
- **Desktop Icons**: Quick access to applications
- **Boot Sequence**: Authentic OS boot experience

### Applications
1. **Terminal** - Full-featured command-line interface
   - Commands: ls, cd, pwd, cat, echo, mkdir, touch, rm, clear, whoami, date
   - Path navigation with support for absolute and relative paths
   - Command history

2. **File Manager** - Visual file browser
   - Navigate through directories
   - View files and folders
   - Grid layout display

3. **Text Editor** - Create and edit files
   - Save files to virtual file system
   - Syntax highlighting
   - Unsaved changes indicator

4. **Calculator** - Functional calculator
   - Basic operations (+, -, ×, ÷)
   - Number pad layout
   - Operation chaining

5. **System Info** - View system information
   - OS and kernel details
   - Hardware information
   - Network status
   - Browser details

### Virtual File System
- Complete file system stored in localStorage
- Default directory structure: `/`, `/home/user`, `/bin`, `/etc`, `/tmp`
- Create, read, update, and delete files/directories
- Persistent across sessions

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **lucide-react** - Icon library
- **localStorage** - Virtual file system storage

## Live Demo

🌐 [View Live Demo](https://thejhyefactor.github.io/browser-os/)

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## How It Works

WebOS creates a complete operating system experience in the browser by:

1. **Window Management**: Using React state to manage window positions, z-index, and lifecycle
2. **Virtual File System**: Implementing a file system API backed by localStorage for persistence
3. **Terminal Emulation**: Command parsing and execution with path resolution
4. **Component Architecture**: Modular design with separate apps loaded dynamically

## Project Structure

```
browser-os/
├── src/
│   ├── apps/               # Application components
│   │   ├── CalculatorApp.jsx
│   │   ├── FileManager.jsx
│   │   ├── SystemInfo.jsx
│   │   ├── TerminalApp.jsx
│   │   └── TextEditor.jsx
│   ├── components/         # Core UI components
│   │   ├── BootScreen.jsx
│   │   ├── Desktop.jsx
│   │   ├── Taskbar.jsx
│   │   └── Window.jsx
│   ├── utils/              # Utility functions
│   │   └── fileSystem.js
│   ├── App.jsx
│   └── main.jsx
├── public/
└── index.html
```

## Features Showcase

### Why This Project Is Impressive

1. **Complete OS Simulation**: Not just a desktop mockup - fully functional terminal, file system, and apps
2. **Window Management**: Drag-and-drop windows with proper z-index stacking
3. **Virtual File System**: Persistent storage with full CRUD operations
4. **Terminal with Real Commands**: Execute actual file system operations
5. **Modern React Patterns**: Hooks, component composition, and state management
6. **Production Ready**: Deployed on GitHub Pages with CI/CD

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contributing

This is a showcase project demonstrating advanced React and web development skills. Feel free to fork and extend!

## License

MIT License - feel free to use this project for learning and inspiration.

## Author

Built by [thejhyefactor](https://github.com/thejhyefactor)

---

**Made with React** • **Deployed on GitHub Pages** • **© 2025 WebOS Project**
