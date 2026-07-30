function formatTimeAgo(createdAt) {
  const timeDifference = Date.now() - createdAt;

  const minutes = Math.floor(timeDifference / 60000);

  const hours = Math.floor(timeDifference / 3600000);

  const lastOneMinutes = minutes % 10;
  const lastTwoMinutes = minutes % 100;

  const lastOneHours = hours % 10;
  const lastTwoHours = hours % 100;
  
  if (hours >= 1) {
    if (hours >= 24) {
      return formatDate(createdAt);
    }

    if (lastTwoHours >= 11 && lastTwoHours <= 14) {
      return hours + " часов назад";
    }

    if (lastOneHours === 1) {
      return hours + " час назад";
    }
    if (lastOneHours >= 2 && lastOneHours <= 4) {
      return hours + " часа назад";
    }
    return hours + " часов назад";
  }

  if (minutes < 1) {
    return "Только что";
  }
  if (lastTwoMinutes >= 11 && lastTwoMinutes <= 14) {
    return minutes + " минут назад";
  }
  if (lastOneMinutes === 1) {
    return minutes + " минуту назад";
  }
  if (lastOneMinutes >= 2 && lastOneMinutes <= 4) {
    return minutes + " минуты назад";
  }

  return minutes + " минут назад";
}
