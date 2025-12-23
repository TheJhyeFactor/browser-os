// Virtual File System using localStorage
const FS_KEY = 'webos-filesystem';

const defaultFileSystem = {
  '/': {
    type: 'directory',
    children: ['home', 'bin', 'etc', 'tmp']
  },
  '/home': {
    type: 'directory',
    children: ['user']
  },
  '/home/user': {
    type: 'directory',
    children: ['Documents', 'Downloads', 'Projects', 'welcome.txt', 'about.txt']
  },
  '/home/user/Documents': {
    type: 'directory',
    children: ['resume.txt', 'notes.txt', 'ideas.txt']
  },
  '/home/user/Documents/resume.txt': {
    type: 'file',
    content: `TheJhyeFactor - Full Stack Developer

GitHub: https://github.com/TheJhyeFactor
Portfolio: https://thejhyefactor.github.io

SKILLS
------
- React, JavaScript, TypeScript
- Node.js, Python
- Web Development & UI/UX Design
- System Architecture
- Operating Systems Development

PROJECTS
--------
- WebOS: Browser-based Operating System
- CareerLift: Professional Resume Builder
- Stock Price Visualizer

ABOUT
-----
Building innovative web applications and browser-based experiences.
Passionate about creating interactive, user-friendly interfaces.

Contact: GitHub @TheJhyeFactor
`,
    modified: new Date().toISOString()
  },
  '/home/user/Documents/notes.txt': {
    type: 'file',
    content: `Development Notes - TheJhyeFactor

WebOS Development:
- Implemented Mac-style window controls
- Added full resize functionality
- Created virtual file system with localStorage
- Built terminal with command execution
- Designed desktop environment with taskbar

Future Ideas:
- Add more system applications
- Implement file search
- Create settings panel
- Add themes support
- Network simulation

Remember: Keep pushing the boundaries of what's possible in the browser!
`,
    modified: new Date().toISOString()
  },
  '/home/user/Documents/ideas.txt': {
    type: 'file',
    content: `Project Ideas - 2025

1. Advanced Code Editor in Browser
2. Real-time Collaboration Tools
3. 3D Graphics Engine
4. Music Production Suite
5. AI-powered Assistant
6. Virtual Reality Desktop
7. Blockchain Explorer
8. Game Engine

Visit my GitHub for more projects:
https://github.com/TheJhyeFactor

Stay creative! 🚀
`,
    modified: new Date().toISOString()
  },
  '/home/user/Downloads': {
    type: 'directory',
    children: ['sample.txt']
  },
  '/home/user/Downloads/sample.txt': {
    type: 'file',
    content: `Sample Download File

This is an example file in the Downloads folder.
You can create, edit, and delete files using the terminal or text editor.

Try editing this file in the Text Editor app!
`,
    modified: new Date().toISOString()
  },
  '/home/user/Projects': {
    type: 'directory',
    children: ['webos', 'careerlift', 'stock-visualizer']
  },
  '/home/user/Projects/webos': {
    type: 'directory',
    children: ['README.md']
  },
  '/home/user/Projects/webos/README.md': {
    type: 'file',
    content: `# WebOS - Browser Operating System

Created by TheJhyeFactor

A fully functional operating system running in your browser!

## Features
- Desktop environment with window management
- Terminal with command execution
- File system with CRUD operations
- Multiple applications
- Mac-style window controls
- Resize functionality

## Tech Stack
- React 19
- Vite
- localStorage for persistence

GitHub: https://github.com/TheJhyeFactor/browser-os
Live: https://thejhyefactor.github.io/browser-os/

Built with ❤️ by TheJhyeFactor
`,
    modified: new Date().toISOString()
  },
  '/home/user/Projects/careerlift': {
    type: 'directory',
    children: ['info.txt']
  },
  '/home/user/Projects/careerlift/info.txt': {
    type: 'file',
    content: `CareerLift - Free Resume Builder

Professional resume builder for job seekers.
Built to help underserved communities.

Features:
- 3 ATS-friendly templates
- Cover letter generator
- Interview preparation
- Career resources

Created by: TheJhyeFactor
GitHub: https://github.com/TheJhyeFactor/careerlift
`,
    modified: new Date().toISOString()
  },
  '/home/user/Projects/stock-visualizer': {
    type: 'directory',
    children: ['info.txt']
  },
  '/home/user/Projects/stock-visualizer/info.txt': {
    type: 'file',
    content: `Stock Price Visualizer

Real-time stock market data visualization tool.

Features:
- Real-time stock data
- Interactive charts
- Watchlist functionality
- Export to CSV
- Candlestick charts

Tech: React, Twelve Data API
By: TheJhyeFactor

GitHub: https://github.com/TheJhyeFactor/stock-price-visualizer
`,
    modified: new Date().toISOString()
  },
  '/home/user/welcome.txt': {
    type: 'file',
    content: `Welcome to WebOS!
Created by TheJhyeFactor

This is a fully functional browser-based operating system running entirely in your web browser.

Features:
- Real terminal with command execution
- File system with create, read, update, delete
- Multiple applications running simultaneously
- Mac-style window management
- Resize and drag windows
- And much more!

Try these commands in the terminal:
- ls (list files)
- cd <directory> (change directory)
- cat <file> (read file)
- mkdir <name> (create directory)
- touch <name> (create file)
- rm <name> (remove file)
- clear (clear terminal)
- help (show all commands)

Explore the Documents and Projects folders for more content!

GitHub: https://github.com/TheJhyeFactor
Portfolio: https://thejhyefactor.github.io/browser-os/

Built with React in 2025 🚀
`,
    modified: new Date().toISOString()
  },
  '/home/user/about.txt': {
    type: 'file',
    content: `About WebOS

Developer: TheJhyeFactor
GitHub: https://github.com/TheJhyeFactor
Repository: https://github.com/TheJhyeFactor/browser-os

WebOS is a browser-based operating system that demonstrates
advanced web development capabilities including:

- Virtual file system using localStorage
- Window management with drag and resize
- Terminal emulator with command execution
- Multiple concurrent applications
- Mac-style UI design
- Real-time updates and state management

This project showcases modern React patterns, component
architecture, and creative problem-solving.

Feel free to explore the source code on GitHub!

© 2025 TheJhyeFactor - All Rights Reserved
`,
    modified: new Date().toISOString()
  },
  '/bin': {
    type: 'directory',
    children: []
  },
  '/etc': {
    type: 'directory',
    children: ['hostname', 'version']
  },
  '/etc/hostname': {
    type: 'file',
    content: 'webos.thejhyefactor.local',
    modified: new Date().toISOString()
  },
  '/etc/version': {
    type: 'file',
    content: `WebOS v2025.1.0
Built by TheJhyeFactor
https://github.com/TheJhyeFactor
`,
    modified: new Date().toISOString()
  },
  '/tmp': {
    type: 'directory',
    children: []
  }
};

export const initFileSystem = () => {
  const stored = localStorage.getItem(FS_KEY);
  if (!stored) {
    localStorage.setItem(FS_KEY, JSON.stringify(defaultFileSystem));
    return defaultFileSystem;
  }
  return JSON.parse(stored);
};

export const getFileSystem = () => {
  return JSON.parse(localStorage.getItem(FS_KEY) || '{}');
};

export const saveFileSystem = (fs) => {
  localStorage.setItem(FS_KEY, JSON.stringify(fs));
};

export const listDirectory = (path) => {
  const fs = getFileSystem();
  const dir = fs[path];
  if (!dir || dir.type !== 'directory') {
    return null;
  }
  return dir.children;
};

export const readFile = (path) => {
  const fs = getFileSystem();
  const file = fs[path];
  if (!file || file.type !== 'file') {
    return null;
  }
  return file.content;
};

export const writeFile = (path, content) => {
  const fs = getFileSystem();
  const pathParts = path.split('/').filter(p => p);
  const fileName = pathParts.pop();
  const dirPath = '/' + pathParts.join('/');

  const dir = fs[dirPath];
  if (!dir || dir.type !== 'directory') {
    return false;
  }

  if (!dir.children.includes(fileName)) {
    dir.children.push(fileName);
  }

  fs[path] = {
    type: 'file',
    content: content,
    modified: new Date().toISOString()
  };

  saveFileSystem(fs);
  return true;
};

export const createDirectory = (path) => {
  const fs = getFileSystem();
  const pathParts = path.split('/').filter(p => p);
  const dirName = pathParts.pop();
  const parentPath = '/' + pathParts.join('/');

  const parent = fs[parentPath];
  if (!parent || parent.type !== 'directory') {
    return false;
  }

  if (!parent.children.includes(dirName)) {
    parent.children.push(dirName);
  }

  fs[path] = {
    type: 'directory',
    children: []
  };

  saveFileSystem(fs);
  return true;
};

export const deleteItem = (path) => {
  const fs = getFileSystem();
  const pathParts = path.split('/').filter(p => p);
  const itemName = pathParts.pop();
  const parentPath = '/' + pathParts.join('/');

  const parent = fs[parentPath];
  if (!parent || parent.type !== 'directory') {
    return false;
  }

  parent.children = parent.children.filter(c => c !== itemName);
  delete fs[path];

  saveFileSystem(fs);
  return true;
};

export const getItemInfo = (path) => {
  const fs = getFileSystem();
  return fs[path] || null;
};
