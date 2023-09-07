import React from 'react';

import TextArea from '../TextArea/TextArea';
import withCharactersLimit from '../withCharactersLimit/withCharactersLimit';

const DescriptionComponent = withCharactersLimit(TextArea);

const Description = props => <DescriptionComponent {...props} />;

export default Description;
