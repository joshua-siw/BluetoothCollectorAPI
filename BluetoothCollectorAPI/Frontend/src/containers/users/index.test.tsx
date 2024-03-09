import * as React from 'react';
import { render } from '@testing-library/react';

import { Users } from '.';

test('Page component should render successfully', () => {
	const { asFragment } = render(<Users />);

	expect(asFragment()).toMatchSnapshot();
});
