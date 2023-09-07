export default [
  {
    before: {
      x: 0,
      y: 0
    },
    expected: {
      x: 5,
      y: 105
    }
  },
  {
    before: {
      x: 200,
      y: 200
    },
    expected: {
      x: 105,
      y: 5
    }
  },
  {
    before: {
      x: 0,
      y: 100
    },
    expected: {
      x: 5,
      y: 55
    }
  },
  {
    before: {
      x: 0,
      y: 23
    },
    expected: {
      x: 5,
      y: 93.5
    }
  },
  {
    before: {
      x: 100,
      y: 0
    },
    expected: {
      x: 55,
      y: 105
    }
  },
  {
    before: {
      x: 29,
      y: 100
    },
    expected: {
      x: 19.5,
      y: 55
    }
  },
  {
    before: {
      x: 100,
      y: 12
    },
    expected: {
      x: 55,
      y: 99
    }
  },
  {
    before: {
      x: 54,
      y: 21
    },
    expected: {
      x: 32,
      y: 94.5
    }
  },
  {
    before: {
      x: 100,
      y: 100
    },
    expected: {
      x: 55,
      y: 55
    }
  }
];
