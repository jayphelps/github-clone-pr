const fetch = require('node-fetch');
const { spawnSync } = require('child_process');

process.on('unhandledRejection', reason => console.error(reason));

function main(bin, script, input, directory) {
  if (!input || !directory) {
    throw new Error('Invalid arguments supplied');
  }

  const inputRegExp = /https?\:\/\/github\.com\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)\/pull\/([0-9]+)/;
  const result = input.match(inputRegExp);

  if (!result) {
    throw new Error(`Invalid PR url: ${input}\n\nExpected: https://github.com/:owner/:repo/pull/:number`);
  }

  const [_, owner, repo, prNumber] = result;

  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`;

  fetch(url)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(({ head, base }) => {
      spawnSync('git', [
        'clone',
        head.repo.ssh_url,
        '--branch',
        head.ref,
        '--single-branch',
        directory
      ], { stdio: 'inherit' });

      spawnSync('git', [
        'remote',
        'add',
        'upstream',
        base.repo.ssh_url
      ], { cwd: directory, stdio: 'inherit' });
    });
}

main(...process.argv);
