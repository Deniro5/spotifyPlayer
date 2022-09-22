export const MillisecondsToMinutesAndSeconds = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  const secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
  return { seconds: secondsString, minutes: minutes.toString() };
};
