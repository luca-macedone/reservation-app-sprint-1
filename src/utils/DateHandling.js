import { DateTime } from "luxon";

export const formattedDate = (_time) => {
  // console.log(time);
  const parsedTime = DateTime.fromISO(_time);
  // console.log(parsedTime);
  return parsedTime.toLocaleString(DateTime.DATETIME_MED);
  // return parsedTime.toString();
};

export const getMinDate = () => {
  let now = DateTime.now();

  if (now.minute > 30) {
    now = now.plus({ hours: 1 }).startOf("hour");
  } else if (now.minute > 0) {
    now = now.set({ minute: 30 });
  }
  return now.toFormat("yyyy-LL-dd'T'HH:mm");
};

export const validDate = (_time) => {
  return DateTime.fromISO(_time).isValid;
};
