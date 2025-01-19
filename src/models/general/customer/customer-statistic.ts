export interface CustomerStatistic {
    title: string
    data: CustomerStatisticData
    extra: any
}

export interface CustomerStatisticData {
    labels: string[]
    datasets: CustomerStatisticDataset[]
}

export interface CustomerStatisticDataset {
    label: string
    backgroundColor: string
    borderColor: string
    data: []
}