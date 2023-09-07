const trimZero = number => (number === '00' ? '0' : number);

/**
 * Will only work for values < 24h
 *
 * @param {Number} seconds
 * @returns {String} Returns string in 'HH:mm:ss' format
 */
export const secondsToDurationString = seconds => new Date(1000 * seconds).toISOString().substr(11, 8);

/**
 * Will only work for values < 24h
 *
 * @param {Number} durationInSeconds
 * @returns {Object} Returns object with hours, minutes and seconds properties (each of type Number)
 */

export const secondsToDurationObject = durationInSeconds => {
  const durationString = secondsToDurationString(durationInSeconds);
  const [hours, minutes, seconds] = durationString.split(':').map(number => Number(trimZero(number)));

  return { hours, minutes, seconds };
};

/**
 * Will only work for values < 24h (Only when we don't extend PlayerDuration)
 * When PlayerDuration is extended, it works for values < one year
 *
 * @param {Object} Expects object with hours, minutes and seconds properties (if PlayerDuration is extended needs 2 more params [weeks and days])
 * @returns {Number} Returns value in seconds
 */

export const durationToSeconds = duration =>
  duration.weeks !== undefined && duration.days !== undefined
    ? Number(duration.weeks) * 604800 +
      Number(duration.days) * 86400 +
      Number(duration.hours) * 3600 +
      Number(duration.minutes) * 60 +
      Number(duration.seconds)
    : Number(duration.hours) * 3600 + Number(duration.minutes) * 60 + Number(duration.seconds);
