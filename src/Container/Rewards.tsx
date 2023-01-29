import React, { useState, useEffect } from 'react';
import { CustomerData, customerInfo, customerRewardsInfo } from '../DataSet';
import {
    MONTHS, HEADER_ROW_NAMES,
    HISTORY_HEADER_ROW_NAMES,
    CUSTOMER_AGGREGATE_TABLE_HEADERS,
    CUSTOMER_REWARDS_BY_MONTH_TITLE,
    CUSTOMER_REWARDS_TITLE
} from '../Constants';
import RewardTable from '../Component/Table';
import Box from '@mui/material/Box';
import TotalRewardsByCustomer from '../Component/TotalRewardsByCustomer';
import Typography from '@mui/material/Typography';

const Rewards: React.FC = () => {
    const [resultData, setTransactionResultData] = useState<customerRewardsInfo[]>([]);
    const [totalRewardsPerCust, setTotalRewardsPerCust] = useState<any>([])
    const getRewardPoints = (amount: number) => {
        let points = 0;
        let over100 = amount - 100;

        if (over100 > 0) {
            points = 50 + (over100 * 2);
        }
        if (amount >= 50 && amount <= 100) {
            points = amount - 50;
        }
        return points
    }
    const getTransactionHistory = (customerId: number, monthNumber: number) => {
        let byCustMonth = CustomerData.filter((row) =>
            row.customerId === customerId && new Date(row.transactionDate).getMonth() === monthNumber
        );
        const updatedArray = byCustMonth.map(item =>
            !item.hasOwnProperty('rewardPoints') ? { ...item, rewardPoints: getRewardPoints(item.amount) } : item);
        return updatedArray;
    }
    const calculateRewards = (data: customerInfo[]) => {
        const pointsPerTransaction = data.map(transaction => {
            let points = getRewardPoints(transaction.amount)
            const month = new Date(transaction.transactionDate).getMonth();
            return { ...transaction, points, month };
        });
        let groupDataByCustomer = {};
        pointsPerTransaction.forEach(pointsPerTransaction => {
            let { customerId, name, month, points } = pointsPerTransaction;
            if (!groupDataByCustomer[customerId]) {
                groupDataByCustomer[customerId] = [];
            }
            if (groupDataByCustomer[customerId][month]) {
                groupDataByCustomer[customerId][month].points += points;
                groupDataByCustomer[customerId][month].monthNumber = month;
                groupDataByCustomer[customerId][month].numOfTransactions++;
                groupDataByCustomer[customerId][month].history = getTransactionHistory(customerId, month)
            }
            else {
                groupDataByCustomer[customerId][month] = {
                    customerId,
                    name,
                    monthNumber: month,
                    month: MONTHS[month],
                    numOfTransactions: 1,
                    points,
                    history: getTransactionHistory(customerId, month)
                }
            }
        });

        setTransactionResultData(Object.values(groupDataByCustomer));
        const totalCustomerInfo = Object.values(groupDataByCustomer).flat()

        let totalRewards = totalCustomerInfo.reduce((acc: any, curr: any) => {
            if (!acc.find(x => x.customerId === curr.customerId)) {
                acc.push({
                    customerId: curr.customerId,
                    name: curr.name,
                    rewardPoints: curr.points
                });
            } else {
                let newRowIndex = acc.findIndex(x => x.customerId === curr.customerId)
                acc[newRowIndex].rewardPoints += curr.points;
            }
            return acc
        }, [] as any[])
        setTotalRewardsPerCust(totalRewards)
        return groupDataByCustomer
    }

    useEffect(() => {
        calculateRewards([...CustomerData]);
    }, []);
    return (
        <div className="container">
            <div className="row">
                <Box pt={4} ml={2} mr={8}>
                    <Typography variant="h5">{CUSTOMER_REWARDS_BY_MONTH_TITLE}</Typography>
                </Box>

                <Box p={4} ml={4} mr={8} >
                    <RewardTable rows={resultData}
                        headers={HEADER_ROW_NAMES}
                        isSubComponentAvailable={true}
                        subTableHeader={"Transaction History"}
                        subTableLabels={HISTORY_HEADER_ROW_NAMES}
                    ></RewardTable>
                </Box>
            </div>

            <Box pt={1} ml={2} mr={8}>
                <Typography variant="h5">{CUSTOMER_REWARDS_TITLE}</Typography>
            </Box>
            <Box p={4} ml={4} mr={8}>
                <TotalRewardsByCustomer rows={totalRewardsPerCust}
                    headers={CUSTOMER_AGGREGATE_TABLE_HEADERS}
                ></TotalRewardsByCustomer>
            </Box>
        </div>)
}

export default React.memo(Rewards);