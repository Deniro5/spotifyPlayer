export const MillisecondsToMinutesAndSeconds = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  const secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
  return { seconds: secondsString, minutes: minutes.toString() };
};

export const uriToId = (uri: string) => {
  return uri.substring(14);
};

export const debounce = (func: () => {}, timeout: number) => {
  let timer: NodeJS.Timeout;
  return (...args: []) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
