export let CustomerData =
    [
        createData(120, 1, "John Smith", "05-01-2019"),
        createData(75, 1, "John Smith", "05-21-2019"),
        createData(94, 1, "John Smith", "05-21-2019"),
        createData(10, 1, "John Smith", "06-01-2019"),
        createData(75, 1, "John Smith", "06-21-2019"),
        createData(200, 1,"John Smith",  "07-01-2019"),
        createData(1, 1,"John Smith","07-04-2019" ),
        createData(80,1,"John Smith", "07-03-2019"),
        createData(224, 1, "John Smith", "07-21-2019"),
        createData(125, 2, "Krishna", "05-01-2019"),
        createData( 75, 2,"Krishna","05-21-2019"),
        createData( 10, 2, "Krishna","06-01-2019"),
        createData( 75, 2, "Krishna", "06-21-2019"),
        createData(200, 2, "Krishna", "07-01-2019"),
        createData(224, 2, "Krishna", "07-21-2019"),
        createData(120, 3, "Tejas LLC", "06-21-2019"),
        createData(150, 3,"Tejas LLC", "06-27-2019"),
        createData( 90, 3,"Tejas LLC", "07-27-2019")
    ] as const

export type historyObj = {
    transactionDate: string,
    customerId: number,
    amount: number,
    rewardPoints: number,
    name: string
}

export type totalRewardPoints = {
    customerId: number,
    name: string,
    rewardPoints: number,
}

export type customerInfo = {
    amount: number,
    customerId: number,
    name: string,
    transactionDate: string,
}

export type customerRewardsInfo = {
    amount: number,
    customerId: number,
    month: string,
    monthNumber: number,
    numOfTransactions: number,
    name: string,
    points: number,
    history: historyObj[] | []
}


export function createData(
    amount: number,
    customerId: number,
    name: string,
    transactionDate: string,
) {
    return { amount, customerId, name, transactionDate };
}