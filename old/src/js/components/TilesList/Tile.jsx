import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Tile.less';

const MAX_VISIBLE_FOOTER_ITEMS = 3;

const formProtocolsListString = list => {
  const listWithUpToThreeDescItems = list.slice(0, MAX_VISIBLE_FOOTER_ITEMS);
  const concatenatedDescItems = listWithUpToThreeDescItems.join(', ');
  const shouldStringHavePeriods = list.length > MAX_VISIBLE_FOOTER_ITEMS;

  const lineEnding = shouldStringHavePeriods ? ' ...' : '';

  return concatenatedDescItems + lineEnding;
};

export default function Tile({ title, link, amount, footerItems, onClick, className }) {
  const tileClass = 'tile';
  const tileContainerClass = classNames(`${tileClass}__container`, className);
  const tileMainClass = `${tileClass}__main`;
  const tileNameClass = `${tileMainClass}__name`;
  const tileMainAmountClass = `${tileClass}__main__amount`;
  const tileFooterClass = `${tileClass}__footer`;

  const onTileClick = event => {
    if (typeof link === 'string' && link.length) {
      window.location.href = link;
    }

    onClick(event);
  };

  const TileAmount = amount !== null ? <div className={tileMainAmountClass}>{amount}</div> : null;

  const TileFooterString = footerItems.length ? formProtocolsListString(footerItems) : null;

  return (
    <div className={tileContainerClass}>
      <div className={tileClass} onClick={onTileClick}>
        <div className={tileMainClass}>
          <div className={tileNameClass}>{title}</div>
          {TileAmount}
        </div>

        <div className={tileFooterClass}>{TileFooterString}</div>
      </div>
    </div>
  );
}

Tile.propTypes = {
  /**
   * Tile name
   */
  title: PropTypes.string.isRequired,

  /**
   * Link for onClick function handler.
   */
  link: PropTypes.string.isRequired,

  /**
   * Amount of items that are nested under this tile.
   */
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * List of nested protocols for this Tile
   */
  footerItems: PropTypes.arrayOf(PropTypes.string),

  /**
   * onClick callback function
   */
  onClick: PropTypes.func,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

Tile.defaultProps = {
  footerItems: [],
  onClick: () => true,
  amount: null,
  className: ''
};
