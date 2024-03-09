import * as React from 'react';

import { table } from '@components';
import { useAppSelector } from '@store/selectors';

interface Props {
	readonly children?: React.ReactNode | React.ReactNode[];
}

export const UsersTable: React.FunctionComponent<Props> = (props: Props) => {
	const { loading, error } = useAppSelector(state => state.user);
	return <></>;
};
