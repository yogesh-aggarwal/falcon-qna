export function getTimeAgo(timestampDiff) {
  let seconds = timestampDiff / 1000;
  if (seconds <= 60) {
    return `${Math.floor(seconds)} sec`;
  } else if (60 < seconds && seconds < 3600) {
    return `${Math.floor(seconds / 60)} min`;
  } else if (seconds >= 3600) {
    return `${Math.floor(seconds / 60 / 60)} hr`;
  }
}
