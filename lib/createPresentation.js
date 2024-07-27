import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { githubNames } from '../constants/github-names.js';
import renderSelectGitHubNameMenu from './renderSelectGitHubNameMenu.js';
import getFileNameAndDate from './getFileNameAndDate.js';
import getPathInfo from './getPathInfo.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (githubNameIndex) => {
  if (
    isNaN(githubNameIndex) ||
    githubNameIndex < 1 ||
    githubNameIndex > githubNames.length
  ) {
    throw new Error('번호는 1부터 10까지 입력해주세요!');
  }

  const memberGithubName = githubNames[githubNameIndex - 1]; // GitHub 닉네임
  const { creationDate, fileName, weekSinceStart } =
    getFileNameAndDate('PRESENTATION');
  const { currentDirPath, basePath, mdPath } = getPathInfo(
    memberGithubName,
    'PRESENTATION'
  );

  /** Initial Setting */
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
    fs.mkdirSync(path.join(basePath, 'DIL'));
    fs.mkdirSync(path.join(basePath, 'presentation'));
  }

  const content = `
# ${weekSinceStart}주차 발표 자료 링크

발표 자료 링크: <여기에 삽입해주세요!>

---
  `.trim();

  const mdPathBefore = path.join(mdPath, '../');

  if (!fs.existsSync(mdPathBefore)) {
    fs.mkdirSync(mdPathBefore);
  }

  if (!fs.existsSync(mdPath)) {
    fs.writeFileSync(mdPath, content, { recursive: true });
  } else {
    throw new Error('이미 해당 파일이 존재합니다!');
  }

  console.log('>>>> 😄 PRESENTATION FILE MAKE SUCCESS! 😄 <<<<');
  rl.close();
});

renderSelectGitHubNameMenu();
