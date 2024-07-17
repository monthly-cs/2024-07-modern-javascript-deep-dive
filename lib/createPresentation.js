import dayjs from "dayjs";
import githubNames from "../constants/github-names";
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

  const studyStartDate = dayjs("2024-07-22");
  const today = dayjs().format("YYYY-MM-DD");

  const weekSinceStart = dayjs(today).diff(studyStartDate, "week") + 1; // 주차 차이
  const fileName = `week_${weekSinceStart}.md`;

  const currentFileUrl = import.meta.url;
  const currentFilePath = fileURLToPath(currentFileUrl);
  const currentDirPath = path.dirname(currentFilePath); // lib directory position

  const memberGithubName = githubNames[githubNameIndex - 1];

  const content = `
# ${weekSinceStart}주차 발표 자료 링크

발표 자료 링크: <여기에 삽입해주세요!>

---
  `.trim();

  const basePath = path.join(currentDirPath, `../docs/${memberGithubName}`);
  const presentationPath = path.join(basePath, "presentation");

  // 디렉토리 존재 여부 확인
  if (!fs.existsSync(mdPath)) {
    // 디렉토리가 없으면 생성
    fs.mkdirSync(mdPath, { recursive: true });
  } else {
    throw new Error("이미 해당 파일이 존재합니다!");
  }

  if (!fs.existsSync(`${presentationPath}/${fileName}`))
    fs.writeFileSync(`${presentationPath}/${fileName}`, content);

  console.log(">>>> 😄 PRESENTATION FILE MAKE SUCCESS! 😄 <<<<");
  rl.close();
});

renderSelectGitHubNameMenu();
