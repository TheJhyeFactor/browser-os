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
    children: ['Documents', 'Downloads', 'welcome.txt']
  },
  '/home/user/Documents': {
    type: 'directory',
    children: []
  },
  '/home/user/Downloads': {
    type: 'directory',
    children: []
  },
  '/home/user/welcome.txt': {
    type: 'file',
    content: `Welcome to WebOS!

This is a fully functional browser-based operating system running entirely in your web browser.

Features:
- Real terminal with command execution
- File system with create, read, update, delete
- Multiple applications running simultaneously
- Window management system
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

Built with React in 2025 🚀
`,
    modified: new Date().toISOString()
  },
  '/bin': {
    type: 'directory',
    children: []
  },
  '/etc': {
    type: 'directory',
    children: []
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
