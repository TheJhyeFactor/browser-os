import { useState, useEffect, useRef } from 'react';
import { listDirectory, readFile, writeFile, createDirectory, deleteItem, getItemInfo } from '../utils/fileSystem';
import './TerminalApp.css';

const TerminalApp = () => {
  const [history, setHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setHistory([
      { type: 'output', content: 'WebOS Terminal v2025.1' },
      { type: 'output', content: 'Type "help" for available commands' },
      { type: 'output', content: '' }
    ]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => [
      'Available commands:',
      '  ls              - List directory contents',
      '  cd <dir>        - Change directory',
      '  pwd             - Print working directory',
      '  cat <file>      - Display file contents',
      '  echo <text>     - Display text',
      '  mkdir <dir>     - Create directory',
      '  touch <file>    - Create empty file',
      '  rm <file>       - Remove file/directory',
      '  clear           - Clear terminal',
      '  whoami          - Display current user',
      '  date            - Display current date/time',
      '  help            - Show this help message'
    ],
    ls: () => {
      const contents = listDirectory(currentPath);
      if (!contents) return ['Error: Not a directory'];
      return contents.length > 0 ? contents : ['Empty directory'];
    },
    pwd: () => [currentPath],
    whoami: () => ['webos-user'],
    date: () => [new Date().toString()],
    clear: () => {
      setHistory([]);
      return null;
    }
  };

  const executeCommand = (cmd) => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    if (!command) return null;

    if (command === 'cd') {
      if (!args[0]) return ['Error: cd requires a directory argument'];

      let newPath;
      if (args[0] === '/') {
        newPath = '/';
      } else if (args[0] === '..') {
        const pathParts = currentPath.split('/').filter(p => p);
        pathParts.pop();
        newPath = '/' + pathParts.join('/');
      } else if (args[0].startsWith('/')) {
        newPath = args[0];
      } else {
        newPath = currentPath === '/' ? `/${args[0]}` : `${currentPath}/${args[0]}`;
      }

      const info = getItemInfo(newPath);
      if (!info || info.type !== 'directory') {
        return [`cd: ${args[0]}: No such directory`];
      }
      setCurrentPath(newPath);
      return null;
    }

    if (command === 'cat') {
      if (!args[0]) return ['Error: cat requires a file argument'];
      const filePath = args[0].startsWith('/') ? args[0] : `${currentPath}/${args[0]}`;
      const content = readFile(filePath);
      if (content === null) return [`cat: ${args[0]}: No such file`];
      return content.split('\n');
    }

    if (command === 'echo') {
      return [args.join(' ')];
    }

    if (command === 'mkdir') {
      if (!args[0]) return ['Error: mkdir requires a directory name'];
      const dirPath = args[0].startsWith('/') ? args[0] : `${currentPath}/${args[0]}`;
      const success = createDirectory(dirPath);
      return success ? null : [`mkdir: cannot create directory '${args[0]}'`];
    }

    if (command === 'touch') {
      if (!args[0]) return ['Error: touch requires a file name'];
      const filePath = args[0].startsWith('/') ? args[0] : `${currentPath}/${args[0]}`;
      const success = writeFile(filePath, '');
      return success ? null : [`touch: cannot create file '${args[0]}'`];
    }

    if (command === 'rm') {
      if (!args[0]) return ['Error: rm requires a file/directory name'];
      const itemPath = args[0].startsWith('/') ? args[0] : `${currentPath}/${args[0]}`;
      const success = deleteItem(itemPath);
      return success ? null : [`rm: cannot remove '${args[0]}'`];
    }

    if (commands[command]) {
      return commands[command](args);
    }

    return [`${command}: command not found. Type 'help' for available commands.`];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [
      ...history,
      { type: 'input', content: input, path: currentPath }
    ];

    const output = executeCommand(input);
    if (output) {
      output.forEach(line => {
        newHistory.push({ type: 'output', content: line });
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="terminal-app" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output" ref={terminalRef}>
        {history.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.type === 'input' ? (
              <>
                <span className="prompt">
                  webos-user@browser:{item.path}$
                </span>
                <span className="command">{item.content}</span>
              </>
            ) : (
              <span>{item.content}</span>
            )}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="prompt">
            webos-user@browser:{currentPath}$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="terminal-input"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalApp;
