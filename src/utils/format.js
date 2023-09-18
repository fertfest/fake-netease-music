const pad = (string) => (`0${string}`).slice(-2);

const format = (seconds) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

export const formatByMilliseconds = (milliseconds) => format(Math.floor(milliseconds / 1000));

export default format;
