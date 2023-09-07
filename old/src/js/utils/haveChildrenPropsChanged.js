import React from 'react';
import deepEqual from 'deep-equal';

/**
 * Returns true if props of all children are the same, false otherwise. Uses deep-equal to compare props objects
 * of corresponding children. Returns `false` not only when at least one prop changes, but also when order of
 * children changes.
 *
 * @param currentChildren
 * @param nextChildren
 * @return {boolean}
 */
export default function haveChildrenPropsChanged(currentChildren, nextChildren) {
  const firstChildPropsCount = React.Children.count(currentChildren);
  const nextChildPropsCount = React.Children.count(nextChildren);

  if (firstChildPropsCount !== nextChildPropsCount) {
    return true;
  }

  if (firstChildPropsCount === 0 || nextChildPropsCount === 0) {
    return false;
  }

  if (areAllArrayValuesPrimitiveTypes(currentChildren) && areAllArrayValuesPrimitiveTypes(nextChildren)) {
    return primitiveValuesDiffer(currentChildren, nextChildren);
  }

  const currentChildrenProps = React.Children.map(currentChildren, returnClonedProps);
  const nextChildrenProps = React.Children.map(nextChildren, returnClonedProps);

  const arePropsTheSame = currentChildrenProps
    .map((currentChildProps, key) => deepEqual(currentChildProps, nextChildrenProps[key]))
    .reduce((prevDoesEqual, currentDoesEqual) => prevDoesEqual && currentDoesEqual, true);

  return !arePropsTheSame;
}

function areAllArrayValuesPrimitiveTypes(arr) {
  return (
    Array.isArray(arr) &&
    arr.every(item => {
      const type = typeof item;

      return type !== 'object' && type !== 'function';
    })
  );
}

function primitiveValuesDiffer(arr1, arr2) {
  return arr1.some((value, key) => value !== arr2[key]);
}

function returnClonedProps(child) {
  const props = (child && child.props) || {};

  return makePropsSafeForDeepEqual(props);
}

function makePropsSafeForDeepEqual(props) {
  const result = {};

  Object.keys(props).forEach(key => {
    const prop = props[key];

    if (typeof prop === 'function') {
      // make functions safe working for deep equal comparision
      result[key] = prop.toString();
    } else {
      result[key] = prop;
    }
  });

  return result;
}
