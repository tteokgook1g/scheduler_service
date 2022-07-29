export const dateToKorean = (date: Date) => {
  const yearNumber = date.getFullYear();
  const year =
    yearNumber !== new Date().getFullYear()
      ? yearNumber.toString().padStart(4, " ") + "년 "
      : "";
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const hour = date.getHours().toString();
  const minute = date.getMinutes().toString();
  return `${year}${month}월 ${day}일 ${hour}시 ${minute}분`;
};

export const dateToDateTimeLocal = (date: Date) => {
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}`;
};
