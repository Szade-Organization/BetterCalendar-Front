export const calculateRemainingTime = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (days >= 2) {
    return `${days}d`;
  } else if (days >= 1) {
    return `${days}d ${hours}h`;
  } else if (hours >= 2) {
    return `${hours}h`;
  } else if (hours >= 1) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m ${seconds}s`;
  }
};

export const calculateProgress = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDuration = end - start;
  const elapsed = now - start;
  return Math.min((elapsed / totalDuration) * 100, 100).toFixed(2);
};

export const getEventsStatistics = (events) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let eventCount = 0;
  let totalHours = 0;
  let completedEventCount = 0;
  const categoryCounts = {};

  events.forEach((event) => {
    const eventStart = new Date(event.date_start);
    const eventEnd = new Date(event.date_end);

    if (eventStart.getMonth() === currentMonth && eventStart.getFullYear() === currentYear) {
      eventCount++;

      if (eventEnd < now) {
        completedEventCount++;
      }

      const eventDuration = (eventEnd - eventStart) / (1000 * 60 * 60);
      totalHours += eventDuration;
      if (event.category) {
        const categoryName = event.category.name;
        if (categoryCounts[categoryName]) {
          categoryCounts[categoryName]++;
        } else {
          categoryCounts[categoryName] = 1;
        }
      }
    }
  });

  const totalHoursInt = Math.floor(totalHours);
  const totalMinutes = Math.round((totalHours - totalHoursInt) * 60);
  const totalDuration = `${String(totalHoursInt).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}`;

  const avgEventDurationInHours = totalHours / eventCount;
  const avgEventDurationHours = Math.floor(avgEventDurationInHours);
  const avgEventDurationMinutes = Math.round((avgEventDurationInHours - avgEventDurationHours) * 60);
  const avgEventDuration = `${String(avgEventDurationHours).padStart(2, '0')}:${String(avgEventDurationMinutes).padStart(2, '0')}`;

  const completionPercentage = ((completedEventCount / eventCount) * 100).toFixed(2);


  return {
    eventCount,
    totalDuration,
    avgEventDuration,
    completionPercentage,
    categoryCounts,
  };
};


