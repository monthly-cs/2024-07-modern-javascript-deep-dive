import dayjs from "dayjs";

export default function getFileNameAndDate(type) {
  const studyStartDate = dayjs("2024-07-22");
  const creationDate = dayjs().format("YYYY-MM-DD");

  switch (type) {
    case "DIL":
      return {
        creationDate,
        fileName: `${creationDate}.md`,
      };
    case "PRESENTATION":
      const weekSinceStart = dayjs().diff(studyStartDate, "week") + 1;
      return {
        creationDate: dayjs().format("YYYY-MM-DD"),
        fileName: `week_${weekSinceStart}.md`,
        weekSinceStart,
      };
    default:
      throw new Error("TYPE NOT ALLOWED!");
  }
}
