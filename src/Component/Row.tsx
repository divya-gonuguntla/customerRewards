import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
import { customerRewardsInfo } from '../Utils/DataSet';
import TableHeader from '../Common/TableHeader';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '0px'
    },
}));

export type Props = {
    key: string,
    row: customerRewardsInfo
    isSubComponentAvailable?: boolean,
    subTableHeader: string,
    subTableLabels: string[]
}

const Row: React.FC<Props> = ({ key, row, isSubComponentAvailable, subTableHeader, subTableLabels
}) => {
    const historyElem = row.history.filter(elem => elem)
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell  padding="none">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <StyledTableCell align="center" padding="none">{row.name}</StyledTableCell>
                <StyledTableCell align="center"  padding="none">{row.numOfTransactions}</StyledTableCell>
                <StyledTableCell align="center" padding="none">{row.month}</StyledTableCell>
                <StyledTableCell align="center" padding="none">{row.points}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                {isSubComponentAvailable ? <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="body2" gutterBottom component="div">
                                {subTableHeader}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHeader headers={subTableLabels} emptyHeader={false} />
                                <TableBody>
                                    {historyElem.map((historyRow) => (
                                        <TableRow key={historyRow.transactionDate as string}>
                                            <StyledTableCell component="th" scope="row">
                                                {historyRow.transactionDate}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{historyRow.amount}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {historyRow.rewardPoints}
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </StyledTableCell> : <></>}
            </StyledTableRow>
        </React.Fragment>
    )
}

export default React.memo(Row);