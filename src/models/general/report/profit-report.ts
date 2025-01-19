import { Store } from "../store/store"
  
export interface ProfitReport {
    id: number
    url: string
    start: string
    end: string
    profit_by_store_report: ProfitByStoreReport[]
}
  
  export interface ProfitByStoreReport {
    id: number
    url: string
    report: number
    store: Store
    currency: string
    spending: string
    revenue: string
    profit: string
    expected_revenue: string
    expected_profit: string
}
  