export interface ISaleOrderView {
    id: number;
    uuid: string;
    orderDate: Date;
    customerId: number;
    customer: string;
    userId: number;
    userName: string;
    amount: number;
    taxes: number;
    total: number;
    statusId: number;
    status: string;
    saleType: string;
    saleTypeId: number;
}
