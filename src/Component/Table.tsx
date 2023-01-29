import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableHeader from '../Common/TableHeader';
import { customerRewardsInfo } from '../Utils/DataSet';
import Row from './Row';

export type Props = {
    rows: customerRewardsInfo[],
    headers: string[],
    isSubComponentAvailable?: boolean,
    subTableHeader: string,
    subTableLabels: string[]
}

const RewardTable: React.FC<Props> = ({ rows, headers, isSubComponentAvailable, subTableHeader, subTableLabels }) => {
    console.log(rows)
    const filteredRows = rows.filter(elm => elm)
    const flattenedRows = filteredRows.flat()
    console.log(flattenedRows);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+parseInt(event.target.value, 5));
        setPage(0);
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="customized table">
                    <TableHeader headers={headers} emptyHeader />
                    <TableBody>
                        {flattenedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <>
                                <Row key={row.name} row={row}
                                    isSubComponentAvailable={isSubComponentAvailable}
                                    subTableHeader={subTableHeader}
                                    subTableLabels={subTableLabels} />
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 100]}
                component="div"
                count={flattenedRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </>
    );
};

export default React.memo(RewardTable);
