import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Wrapper } from '@components';

import './index.scss';

export const Users: React.FunctionComponent = () => {
	const { t } = useTranslation();

	return (
		<Wrapper>
			<div className="o-shell">{t('Users')}</div>
		</Wrapper>
	);
};

export default Users;
