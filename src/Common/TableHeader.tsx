import React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#bdbdbd",
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export type Props = {
    headers: string[],
    emptyHeader: boolean
}

const TableHeader: React.FC<Props> = ({ headers, emptyHeader }) => {

    return (
        <>
            <TableHead>
                <TableRow>
                    {emptyHeader ? <StyledTableCell /> : <></>}
                    {headers.map((headerTitle) =>
                        <StyledTableCell align="center" padding="none">{headerTitle}</StyledTableCell>
                    )}
                </TableRow>
            </TableHead>
        </>
    );
};

export default React.memo(TableHeader);
