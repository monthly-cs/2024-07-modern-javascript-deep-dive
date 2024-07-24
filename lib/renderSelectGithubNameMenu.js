import { githubNames } from "../constants/github-names.js";

/** GitHub 이름 선택하는 메뉴 터미널 렌더링 */
export default function renderSelectGitHubNameMenu() {
  console.clear();
  console.log("< Choose your github name 😃 >");
  githubNames.forEach((name, index) => {
    console.log(`${index + 1}. ${name}`);
  });
}
