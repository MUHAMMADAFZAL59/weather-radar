const { exec } = require('child_process');
const path = require('path');

const startServers = () => {
  console.log('Starting backend server...');
  const backend = exec('npm run dev', { cwd: path.join(__dirname, 'backend') });
  backend.stdout.on('data', (data) => console.log(`Backend: ${data}`));
  backend.stderr.on('data', (data) => console.error(`Backend Error: ${data}`));
  backend.on('close', (code) => console.log(`Backend exited with code ${code}`));

  console.log('Starting frontend server...');
  const frontend = exec('npm run dev', { cwd: path.join(__dirname, 'frontend') });
  frontend.stdout.on('data', (data) => console.log(`Frontend: ${data}`));
  frontend.stderr.on('data', (data) => console.error(`Frontend Error: ${data}`));
  frontend.on('close', (code) => console.log(`Frontend exited with code ${code}`));
};

startServers();
