import React from 'react';
import { shallow } from 'enzyme';

import Tile from './Tile';

describe('<Tile />', () => {
  let onClick;
  const expectedLocationAfterClick = '#afterClick';

  const shallowTile = (protocols = [], amount = 0) => {
    onClick = jest.fn();

    return shallow(
      <Tile
        title="Test title"
        amount={amount}
        link={expectedLocationAfterClick}
        protocolsList={protocols}
        onClick={onClick}
      />
    );
  };

  describe('when rendering', () => {
    it('should have correct html', () => {
      const protocols = ['First', 'Second', 'Third'];

      const tile = shallowTile(protocols);

      expect(tile).toMatchSnapshot();
    });

    describe('when there is protocols list specified', () => {
      describe('when there are up to 3 protocols in the list', () => {
        it('should not show "..."', () => {
          const protocols = ['First', 'Second'];

          const tile = shallowTile(protocols);

          expect(tile.find('.tile__footer')).toMatchSnapshot();
        });
      });

      describe('when there are more than 3 protocols', () => {
        it('should cut up to 3 protocols and show "..." at the end', () => {
          const protocols = ['First', 'Second', 'Third', 'Fourth'];

          const tile = shallowTile(protocols);

          expect(tile.find('.tile__footer')).toMatchSnapshot();
        });
      });
    });

    describe('when there are no protocols specified', () => {
      it('footer should not have text', () => {
        const tile = shallowTile();

        expect(tile).toMatchSnapshot();
      });
    });

    describe('when there is no amount specified', () => {
      it('should have no amount block', () => {
        const protocols = ['First', 'Second'];
        const tile = shallowTile(protocols, 0);

        expect(tile).toMatchSnapshot();
      });
    });

    describe('when there is amount specified', () => {
      describe('and no protocols specified', () => {
        it('should have amount block and no text in footer block', () => {
          const protocols = [];
          const tile = shallowTile(protocols, 1);

          expect(tile).toMatchSnapshot();
        });
      });
    });

    describe('when clicking on a Tile', () => {
      it('should call onClick() callback', () => {
        // given
        const tile = shallowTile([]);
        const tileElement = tile.find('.tile');

        expect(onClick).not.toHaveBeenCalled();

        // when
        tileElement.simulate('click');

        // then
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
