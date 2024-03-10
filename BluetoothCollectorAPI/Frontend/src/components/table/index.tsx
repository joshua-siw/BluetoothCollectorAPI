import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './index.scss';

interface TableProps {
	data: any[];
	columns: IColumn[];
}

export interface IColumn {
	field: string;
	header: string;
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
	return (
		<DataTable className="custom-table" value={data} stripedRows>
			{columns.map((col, i) => (
				<Column key={col.field} field={col.field} header={col.header} />
			))}
		</DataTable>
	);
};

export default Table;
