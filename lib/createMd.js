import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { githubNames } from "../constants/github-names.js";
import renderSelectGitHubNameMenu from "./renderSelectGitHubNameMenu.js";
import getFileNameAndDate from "./getFileNameAndDate.js";
import getPathInfo from "./getPathInfo.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (githubNameIndex) => {
  if (
    isNaN(githubNameIndex) || // isNaN이 true이면 숫자가 아닌 문자열
    Number(githubNameIndex) < 1 ||
    Number(githubNameIndex) > githubNames.length
  ) {
    throw new Error("번호는 1부터 10까지 입력해주세요!");
  }

  const memberGithubName = githubNames[githubNameIndex - 1]; // GitHub 닉네임
  const { creationDate, fileName } = getFileNameAndDate("DIL");
  const { currentDirPath, basePath, mdPath } = getPathInfo(
    memberGithubName,
    "DIL"
  );

  /** Initial Setting */
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
    fs.mkdirSync(path.join(basePath, "DIL"));
    fs.mkdirSync(path.join(basePath, "presentation"));
  }

  const content = `
# DIL: 모던 자바스크립트 Deep Dive

> 스터디: 월간 CS, https://github.com/monthly-cs/2024-07-modern-javascript-deep-dive  
> 작성일: ${creationDate}  
> 작성자: ${memberGithubName}

---
  `.trim();

  if (!fs.existsSync(mdPath)) {
    fs.writeFileSync(mdPath, content, { recursive: true });
  } else {
    throw new Error("이미 해당 파일이 존재합니다!");
  }

  console.log(">>>> 😄 DIL FILE MAKE SUCCESS! 😄 <<<<");
  rl.close();
});

renderSelectGitHubNameMenu();
