import React from 'react';

// Mantine :
import { Table } from '@mantine/core';

// Models :
import { UserReward } from '../models/user_reward';

// Helpers :
import { formatCurrency } from '../helpers/text_utils';

type Params = {
  rows: UserReward[];
};

type RowParams = {
  row: UserReward;
  index: number;
};

function Row({ index, row }: RowParams) {
  const formattedAmount = formatCurrency(row.amount);
  const formattedBalance = formatCurrency(row.balance);

  return (
    <Table.Tr key={row.id} className="table-row-container">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td className="row-title">{row.op}</Table.Td>
      <Table.Td>{row.created_at.toLocaleDateString()}</Table.Td>
      <Table.Td className="content-center">{formattedAmount}</Table.Td>
      <Table.Td className="content-center">{formattedBalance}</Table.Td>
    </Table.Tr>
  );
}
function EmptyTable() {
  return (
    <Table.Tr>
      <Table.Td></Table.Td>
      <Table.Td>Sin datos</Table.Td>
      <Table.Td></Table.Td>
      <Table.Td></Table.Td>
      <Table.Td></Table.Td>
    </Table.Tr>
  );
}

export function UserRewardsTable({ rows }: Params) {
  return (
    <Table highlightOnHover withTableBorder className="table-container">
      <Table.Thead className="table-head-container">
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Origen</Table.Th>
          <Table.Th>Fecha</Table.Th>
          <Table.Th className="content-center">Monto</Table.Th>
          <Table.Th className="content-center">Saldo</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows.length > 0 ? (
          <React.Fragment>
            {rows.map((r, index) => (
              <Row row={r} index={index} key={r.id} />
            ))}
          </React.Fragment>
        ) : (
          <EmptyTable />
        )}
      </Table.Tbody>
    </Table>
  );
}
