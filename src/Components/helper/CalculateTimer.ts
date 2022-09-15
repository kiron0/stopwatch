function calculateTimer(timeInMiliSeconds: number): Array<number | string> {
  const hour = Math.floor(timeInMiliSeconds / 3600000);
  const minute = Math.floor(timeInMiliSeconds / 60000);
  const second = ((timeInMiliSeconds % 60000) / 1000).toFixed(0);
  const milisecond = timeInMiliSeconds % 1000;
  const hourString = hour < 10 ? `0${hour}` : hour;
  const minuteString = minute < 10 ? `0${minute}` : minute;
  const secondString = Number(second) < 10 ? `0${second}` : second;
  // show all the numbers 0-999 on milisecondString
  const milisecondString =
    milisecond < 10
      ? `00${milisecond}`
      : milisecond < 100
      ? `0${milisecond}`
      : milisecond;
  // show only 2 digits of milisecond
  return [
    hourString,
    minuteString,
    secondString,
    milisecondString.toString().slice(0, 2),
  ];
  // return [hourString,minuteString, secondString, milisecondString];
}
export default calculateTimer;
