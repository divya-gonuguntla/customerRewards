import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableHeader from './TableHeader';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { customerRewardsInfo, totalRewardPoints } from './DataSet';
import Row from './Row';
import { styled } from '@mui/material/styles';

export type Props = {
    rows: totalRewardPoints[],
    headers: string[]
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const RewardTable: React.FC<Props> = ({ rows, headers }) => {
    console.log(rows)
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
                <Table sx={{ minWidth: 400 }} aria-label="customized table" >
                    <TableHeader headers={headers} emptyHeader={false} />
                    <TableBody>
                        {rows.map((row) => {
                            return <TableRow key={row.customerId}>
                                <StyledTableCell align="center" padding="none">{row.name}</StyledTableCell>
                                <StyledTableCell align="center" padding="none">{row.rewardPoints}</StyledTableCell>
                            </TableRow>
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </>
    );
};

export default React.memo(RewardTable);
