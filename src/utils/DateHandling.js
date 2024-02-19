import { DateTime } from "luxon";

export const formattedDate = (time) => {
  // console.log(time);
  const parsedTime = DateTime.fromMillis(parseInt(time, 10));
  // console.log(parsedTime);
  return parsedTime.toLocaleString(DateTime.DATETIME_MED);
  // return parsedTime.toString();
};