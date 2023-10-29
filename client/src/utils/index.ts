export const MillisecondsToMinutesAndSeconds = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  const secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
  return { seconds: secondsString, minutes: minutes.toString() };
};

export const MinutesToDisplayTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const minutesString = minutes < 10 ? "0" + minutes : minutes.toString();
  return `${hours}:${minutesString}`;
};

export const uriToId = (uri: string | null) => {
  return uri ? uri.substring(14) : "";
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

export const hoursToMilliseconds = (hours: number) => hours * 3600000;
export const minutesToMilliseconds = (minutes: number) => minutes * 60000;

export const getAdjustedPopoverPosition = (
  xPosition: number,
  yPosition: number,
  popoverWidth: number,
  popoverHeight: number
) => {
  //adjusts popover position to prevent it from overflowing off screen
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  let adjustedX = xPosition;
  let adjustedY = yPosition;

  if (adjustedX + popoverWidth > screenWidth) {
    adjustedX = screenWidth - popoverWidth;
  }

  if (adjustedY + popoverHeight > screenHeight) {
    adjustedY = screenHeight - popoverHeight;
  }

  return { adjustedX, adjustedY };
};

export const isAlphaNumeric = (str: string) => {
  return /^[a-zA-Z0-9]*$/.test(str);
};
