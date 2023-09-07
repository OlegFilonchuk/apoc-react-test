const KEY_CODES = {
  Enter: 13,
  Escape: 27
};

export const findInput = el => el.find('input');

export const setInputValue = (input, value) => {
  /* eslint-disable no-param-reassign */
  input.simulate('input', { target: { value } });
  /* eslint-enable no-param-reassign */

  return input;
};

export const simulateEvent = (input, eventType, key) => {
  const options = key
    ? {
        key,
        keyCode: KEY_CODES[key],
        which: KEY_CODES[key]
      }
    : {};

  input.simulate(eventType, options);
};
