import PropTypes from 'prop-types';

export const dataTestElementPropName = 'data-test-element';
export const dataTestElementPropNameAlternative = 'dataTestElement';

const EMPTY_OBJECT = {};

export const getDataTestElementProps = (propsOrStaticValue, process) => {
  const dataTestElementPropValue =
    typeof propsOrStaticValue === 'string'
      ? propsOrStaticValue
      : propsOrStaticValue[dataTestElementPropName] || propsOrStaticValue[dataTestElementPropNameAlternative];
  const processedValue = process ? process(dataTestElementPropValue) : dataTestElementPropValue;

  return processedValue
    ? {
        [dataTestElementPropName]: processedValue
      }
    : EMPTY_OBJECT;
};

export const DTE = getDataTestElementProps;

export const dataTestElementPropTypes = {
  /**
   * Sets 'data-test-element' prop needed by testers.
   */
  [dataTestElementPropNameAlternative]: PropTypes.string,

  /**
   * Alternate prop for 'data-test-element' attribute value. Setting this props will have priority over dataTestElement prop
   */
  [dataTestElementPropName]: PropTypes.string
};
