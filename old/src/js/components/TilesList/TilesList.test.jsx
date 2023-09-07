import React from 'react';
import { shallow } from 'enzyme';

import Tile from './Tile';
import TilesList from './TilesList';

describe('<TilesList />', () => {
  describe('when rendering', () => {
    it('should have correct html', () => {
      const protocols = ['One', 'Two', 'Three'];

      const tilesList = shallow(
        <TilesList>
          <Tile title="Test title" link="#testLink" amount={protocols.length} footerItems={protocols} />
        </TilesList>
      );

      expect(tilesList).toMatchSnapshot();
    });
  });
});
