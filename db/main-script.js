const { spawn } = require('child_process');

const scripts = [
//  'wipe-categories.js',
//  'wipe-collections.js',
//  'wipe-users.js',
//  'wipe-comments.js',
//  'wipe-items.js',
  'seed-users.js',
  'seed-categories.js',
  'seed-collections.js',
  'seed-comments.js',
  'seed-items.js',
  'follower-script.js',
  'collections-createdby-script.js',
  'items-createdby-script.js',
  'collections-likes-script.js',
  'assign-gaming-script.js',
  'assign-programming-script.js',
  'assign-sport-fitness-script.js',
  'assignitems-script.js'
];

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptPath]);

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Script ${scriptPath} exited with code ${code}`));
        return;
      }
      resolve();
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

async function runScripts() {
  try {
    for (const script of scripts) {
      console.log(`Running script ${script}...`);
      await runScript(script);
    }
    console.log('All scripts finished successfully.');
  } catch (error) {
    console.error('Error running scripts:', error);
  }
}

runScripts();
