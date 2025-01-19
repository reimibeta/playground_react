export interface SupplyStatistic {
    title: string
    data: SupplyStatisticData
    extra: any
}

export interface SupplyStatisticData {
    labels: string[]
    datasets: SupplyStatisticDataset[]
}

export interface SupplyStatisticDataset {
    label: string
    backgroundColor: string
    borderColor: string
    data: []
    // data: [
    //     number,
    //     number,
    //     number,
    //     number,
    //     number,
    //     number,
    //     number,
    //     number,
    //     number,
    //     number,
    //     number,
    //     number
    // ]
}
  

// export interface Root {
//     title: string
//     data: Data
//     extra: Extra
//   }
  
//   export interface Data {
//     labels: string[]
//     datasets: Dataset[]
//   }
  
//   export interface Dataset {
//     label: string
//     backgroundColor: string[]
//     borderColor: string[]
//     data: number[]
//   }
  
//   export interface Extra {}
  