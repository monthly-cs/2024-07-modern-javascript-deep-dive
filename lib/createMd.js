import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import dayjs from "dayjs";
import { fileURLToPath } from "url";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/** Check value is number or not */
function isNumber(value) {
  // 입력값이 문자열인지 확인
  if (typeof value !== "string") {
    return false;
  }

  // 문자열을 숫자로 변환할 수 있는지 확인
  return !isNaN(value) && !isNaN(parseFloat(value));
}

/** GitHub Nicknames of our study */
const githubNames = [
  "iamkanguk97",
  "paran22",
  "paigekim29",
  "BeomyeonAndrewKim",
  "she0108",
  "nsong113",
  "jrary",
  "HyoKyoungLee",
  "w00khyung",
  "Yoonji23",
];

/** GitHub 이름 선택하는 메뉴 터미널 렌더링 */
const renderSelectGitHubNameMenu = () => {
  console.clear();
  console.log("< Choose your github name 😃 >");
  githubNames.forEach((name, index) => {
    console.log(`${index + 1}. ${name}`);
  });
};

rl.on("line", (githubNameIndex) => {
  if (
    !isNumber(githubNameIndex) ||
    githubNameIndex < 1 ||
    githubNameIndex > githubNames.length
  ) {
    throw new Error("번호는 1부터 10까지 입력해주세요!");
  }

  const fileDate = dayjs().format("YYYY-MM-DD");
  const fileName = `${fileDate}.md`; // 파일 이름

  const currentFileUrl = import.meta.url;
  const currentFilePath = fileURLToPath(currentFileUrl);
  const currentDirPath = path.dirname(currentFilePath); // lib directory position

  const memberGithubName = githubNames[githubNameIndex - 1];

  const content = `
# DIL: 모던 자바스크립트 Deep Dive

> 스터디: 월간 CS, https://github.com/monthly-cs/2024-07-modern-javascript-deep-dive  
> 작성일: ${fileDate}  
> 작성자: ${memberGithubName}

---
  `.trim();

  const basePath = path.join(currentDirPath, `../docs/${memberGithubName}`);
  const mdPath = path.join(basePath, "DIL");

  console.log(mdPath);

  // 디렉토리 존재 여부 확인
  if (!fs.existsSync(mdPath)) {
    // 디렉토리가 없으면 생성
    fs.mkdirSync(mdPath, { recursive: true });
  } else {
    throw new Error("이미 해당 파일이 존재합니다!");
  }

  if (!fs.existsSync(`${mdPath}/${fileName}`))
    fs.writeFileSync(`${mdPath}/${fileName}`, content);

  console.log(">>>> 😄 DIL FILE MAKE SUCCESS! 😄 <<<<");
  rl.close();
});

renderSelectGitHubNameMenu();
