/* global APOC_PKG_VERSION, APOC_GIT_SHA1, APOC_GIT_URL */
/* eslint-disable no-undef  */

const APOC_REACT = {
  VERSION: 'N/A',
  GIT_SHA1: 'N/A',
  GIT_URL: 'N/A'
};

try {
  Object.assign(APOC_REACT, {
    VERSION: APOC_PKG_VERSION,
    GIT_SHA1: APOC_GIT_SHA1,
    GIT_URL: APOC_GIT_URL
  });
} catch (e) {
  if (e instanceof ReferenceError) {
    // webpack.DefinePlugin constants are not defined when apoc-react is build by an outside process
  } else {
    throw e;
  }
}

/* eslint-enable no-undef  */

Object.freeze(APOC_REACT);

export default APOC_REACT;
