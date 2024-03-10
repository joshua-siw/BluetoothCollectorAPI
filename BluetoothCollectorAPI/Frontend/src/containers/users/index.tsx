import * as React from 'react';

import { Wrapper } from '@components';

import './index.scss';
import { UsersTable } from '@src/components/users-table';

export const Users: React.FunctionComponent = () => {
	return (
		<Wrapper className="o-wrapper--fancy">
			<UsersTable></UsersTable>
		</Wrapper>
	);
};

export default Users;
