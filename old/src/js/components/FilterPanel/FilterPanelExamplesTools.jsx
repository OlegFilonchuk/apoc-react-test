/* eslint-disable no-param-reassign, no-plusplus */
import React from 'react';

import FilterPanel from './FilterPanel';
import FilterPanelCollapse from './FilterPanelCollapse';

let counter = Math.random();

export const dummy = () => true;

export const mapNtimes = options => {
  options.min = options.min || 0;
  options.max = options.max || 10;
  options.param = options.param || 0;

  return Array.from(Array(Math.ceil(options.min + (options.max - options.min) * Math.random())).keys()).map(i =>
    options.callback(options.param, i)
  );
};

export const makeSomeFilterData = () =>
  mapNtimes({
    min: 3,
    max: 10,
    param: counter++,
    callback: (c, i) => ({
      id: `fi-${c}-${i + 1}`,
      label: `Filter #${i + 1}`,
      labelCount: Math.ceil(Math.random() * 100)
    })
  });

export const makeSomeFilters = collapsible =>
  mapNtimes({
    min: 3,
    max: 8,
    param: counter++,
    callback: (c, i) => {
      const FilterComponent = collapsible ? FilterPanelCollapse : FilterPanel;

      return (
        <FilterComponent
          key={`${c}-${i + 1}`}
          title={`Filter #${i + 1}`}
          id={`f-${c}-${i + 1}`}
          options={makeSomeFilterData()}
        />
      );
    }
  });

export const labelTextStyle = {
  display: 'inline-block',
  width: '7em'
};
