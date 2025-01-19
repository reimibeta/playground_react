export interface StaffStatistic {
    title: string
    data: StaffStatisticData
    extra: any
}

export interface StaffStatisticData {
    labels: string[]
    datasets: StaffStatisticDataset[]
}

export interface StaffStatisticDataset {
    label: string
    backgroundColor: string
    borderColor: string
    data: []
}