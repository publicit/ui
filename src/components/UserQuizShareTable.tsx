// Mantine :
import { Button, Table } from '@mantine/core';

// Models :
import { UserQuizShare } from '../models/user_quiz_share';
import { IconCheck } from '@tabler/icons-react';

type Params = {
  rows: UserQuizShare[];
  onDelete: (item: UserQuizShare) => {};
};

type RowParams = {
  item: UserQuizShare;
  index: number;
  onDelete: (item: UserQuizShare) => {};
};

function Row({ index, item, onDelete }: RowParams) {
  const isUsed: boolean = JSON.stringify(item.used_at) !== 'null';
  const usedIcon = <IconCheck style={{ color: 'green' }} />;
  return (
    <Table.Tr key={item.id} className="table-row-container">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td className="row-title">
        {`${item.created_at.toLocaleDateString()} ${item.created_at.toLocaleTimeString()}`}
      </Table.Td>
      <Table.Td className="row-title">
        {isUsed &&
          `${item.used_at?.toLocaleDateString()} ${item.used_at?.toLocaleTimeString()}`}
      </Table.Td>
      <Table.Td className="content-center">{item.user_referred?.name}</Table.Td>
      <Table.Td>
        {isUsed ? (
          usedIcon
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => onDelete(item)}
          >
            {'Eliminar'}
          </Button>
        )}
      </Table.Td>
    </Table.Tr>
  );
}

function EmptyTable() {
  return (
    <Table.Tr className="table-row-container">
      <Table.Td></Table.Td>
      <Table.Td></Table.Td>
      <Table.Td></Table.Td>
      <Table.Td></Table.Td>
      <Table.Td className="content-center">Sin datos</Table.Td>
    </Table.Tr>
  );
}

export function UserQuizShareTable({ rows, onDelete }: Params) {
  return (
    <Table highlightOnHover withTableBorder className="table-container">
      <Table.Thead className="table-head-container">
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Compartido</Table.Th>
          <Table.Th>Activado</Table.Th>
          <Table.Th className="content-center">Quien</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows.length > 0 ? (
          <>
            {rows.map((row: UserQuizShare, index: number) => (
              <Row key={row.id} item={row} index={index} onDelete={onDelete} />
            ))}
          </>
        ) : (
          <EmptyTable />
        )}
      </Table.Tbody>
    </Table>
  );
}
