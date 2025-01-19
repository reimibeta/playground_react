export interface OrderStatistic {
    title: string
    data: OrderStatisticData
    extra: any
}

export interface OrderStatisticData {
    labels: string[]
    datasets: OrderStatisticDataset[]
}

export interface OrderStatisticDataset {
    label: string
    backgroundColor: string
    borderColor: string
    data: []
}