import * as React from 'react';

import { Table } from '@components';
import { useAppSelector } from '@store/selectors';
import { useDispatch } from 'react-redux';
import { UserActionType } from '@store/enums';
import { IColumn } from '../table';

interface Props {
	readonly children?: React.ReactNode | React.ReactNode[];
}

export const UsersTable: React.FunctionComponent<Props> = (props: Props) => {
	const dispatch = useDispatch();
	const { loading, error, users } = useAppSelector(state => state.user);
	const columnNames = ['userName', 'email', 'role'];

	const columns: IColumn[] = columnNames.map((columnName: string) => ({
		field: columnName,
		header: columnName.charAt(0).toUpperCase() + columnName.slice(1)
	}));

	React.useEffect(() => {
		dispatch({
			type: UserActionType.GET_ALL_REQUEST,
			payload: {}
		});
		return () => {};
	}, []);

	return <>{!loading && !error && users && <Table data={users} columns={columns} />}</>;
};
