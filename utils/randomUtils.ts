export function transformHours(date: string) {
  const [hours, minutes, seconds] = date.split(':');
  if (parseInt(hours) > 0) {
    return hours + ':' + minutes + (parseInt(hours) > 1 ? ' hours' : ' hour');
  } else {
    return minutes + ':' + seconds + ' minutes';
  }
}

export function weekCalculator(week?: number) {
  let date = new Date();
  date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
  if (week && week !== 0) {
    date.setDate(date.getDate() + week * 7);
  }
  const start = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  date.setDate(date.getDate() + 6);
  const end = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return { start, end };
}
