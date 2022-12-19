export function getHours(timestamp) {
  return new Date(timestamp * 1000).getUTCHours();
}

export function getCurrentDate(timestamp) {
  const today = new Date(timestamp * 1000);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = [
    'Monday',
    'Thusday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  let curDay = null;

  if (today.getUTCDay() === 0) {
    curDay = days[days.length - 1];
  } else {
    curDay = days[today.getDay() - 1];
  }

  return (
    today.getUTCDate() +
    ' - ' +
    curDay +
    ', ' +
    monthNames[today.getMonth()] +
    ', ' +
    today.getFullYear()
  );
}

export function chosenIcon(icon) {
  if (icon === 'Clouds') {
    return require('@/assets/svg/cloudy.svg');
  } else if (icon === 'Drizzle') {
    return require('@/assets/svg/drizzle.svg');
  } else if (icon === 'Thunderstorm') {
    return require('@/assets/svg/thunderstorms.svg');
  } else if (icon === 'Rain') {
    return require('@/assets/svg/rain.svg');
  } else if (icon === 'Snow') {
    return require('@/assets/svg/snow.svg');
  } else if (icon === 'Mist') {
    return require('@/assets/svg/mist.svg');
  } else if (icon === 'Smoke') {
    return require('@/assets/svg/smoke.svg');
  } else if (icon === 'Haze') {
    return require('@/assets/svg/haze.svg');
  } else if (icon === 'Dust') {
    return require('@/assets/svg/dust.svg');
  } else if (icon === 'Sand') {
    return require('@/assets/svg/dust.svg');
  } else if (icon === 'Ash') {
    return require('@/assets/svg/dust.svg');
  } else if (icon === 'Squall') {
    return require('@/assets/svg/dust.svg');
  } else if (icon === 'Fog') {
    return require('@/assets/svg/dust.svg');
  } else if (icon === 'Tornado') {
    return require('@/assets/svg/tornado.svg');
  } else if (icon === 'Clear') {
    return require('@/assets/svg/clear-day.svg');
  } else {
    return require('@/assets/svg/cloudy.svg');
  }
}

export function convertDtx(dtx) {
  const date = dtx.split(' ')[0];
  const time = dtx.split(' ')[1];
  return date.slice(5) + ', ' + time.slice(0, 5);
}
