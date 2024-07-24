import * as path from "path";
import { fileURLToPath } from "url";
import getFileNameAndDate from "./getFileNameAndDate.js";

export default function getPathInfo(memberGithubName, type) {
  const currentFileUrl = import.meta.url;
  const currentFilePath = fileURLToPath(currentFileUrl);

  const currentDirPath = path.dirname(currentFilePath);
  const basePath = path.join(currentDirPath, `../docs/${memberGithubName}`);

  const { _, fileName } = getFileNameAndDate(type);

  switch (type) {
    case "DIL":
      return {
        currentDirPath,
        basePath,
        mdPath: path.join(basePath, `DIL/${fileName}`),
      };
    case "PRESENTATION":
      return {
        currentDirPath,
        basePath,
        mdPath: path.join(basePath, `presentation/${fileName}`),
      };
    default:
      throw new Error("TYPE NOT ALLOWED!");
  }
}
