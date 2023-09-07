import React from 'react';
import propTypes from 'prop-types';

export const CONTEXT_ID = 'APOC_REACT_TABLE_CONTEXT';

export const tableContextPropTypes = propTypes.shape({
  /**
   * @type {function(uuid: string, index:number, contentTypes: CellContentTypes)}
   */
  registerColumn: propTypes.func,
  /**
   * @type {function(uuid: string)}
   */
  unregisterColumn: propTypes.func,
  /**
   * @type {function(index: ?number):CellContentTypes}
   */
  getColumnContentTypes: propTypes.func
});

/**
 * @type {CellContentTypes}
 */
export const defaultContentTypes = {
  dateContent: false,
  iconOrGraphicalContent: false,
  textContent: false,
  numericContent: false
};

export const defaultCellTableProps = {
  registerColumn: () => null,
  unregisterColumn: () => null,
  getColumnContentTypes: () => defaultContentTypes
};

export function withTableContext(Component) {
  function WithTableContext(props, context) {
    return <Component {...props} tableProps={context[CONTEXT_ID]} />;
  }

  WithTableContext.propTypes = Component.propTypes;

  WithTableContext.contextTypes = {
    [CONTEXT_ID]: tableContextPropTypes
  };

  WithTableContext.displayName = `withTableContext${Component.displayName || Component.name}`;

  WithTableContext.WrappedComponent = Component;

  return WithTableContext;
}

/* eslint-disable no-unused-vars */
/**
 * @typedef {{dateContent: boolean,iconOrGraphicalContent: boolean,textContent: boolean, numericContent: boolean}} CellContentTypes
 */
const CellContentTypes = {};
/* eslint-enable no-unused-vars */
